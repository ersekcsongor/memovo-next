import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PhotoStatus } from "@prisma/client";
import { EventsService } from "../events/events.service";
import { PrismaService } from "../prisma/prisma.service";
import { StorageService } from "../storage/storage.service";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const MAX_BYTES = 15 * 1024 * 1024;

@Injectable()
export class PhotosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly storage: StorageService,
    private readonly events: EventsService,
  ) {}

  /** Public path: a guest scans the QR code and uploads without an account. */
  async upload(slug: string, file: Express.Multer.File | undefined, uploaderName?: string) {
    if (!file) throw new BadRequestException("No file received");
    if (!ALLOWED.includes(file.mimetype)) throw new BadRequestException("Images only");
    if (file.size > MAX_BYTES) throw new BadRequestException("Images must stay under 15 MB");

    const event = await this.prisma.event.findUnique({ where: { slug } });
    if (!event) throw new NotFoundException("No such gallery");
    if (!this.events.isOpen(event)) throw new ForbiddenException("This gallery has closed");

    const stored = await this.storage.saveImage(event.id, file);
    return this.prisma.photo.create({
      data: {
        eventId: event.id,
        uploaderName: uploaderName?.trim() || null,
        fileUrl: stored.fileUrl,
        fileKey: stored.fileKey,
        thumbnailUrl: stored.thumbnailUrl,
        thumbnailKey: stored.thumbnailKey,
        // A gallery that moderates holds new photos back until the owner looks.
        status: event.requiresApproval ? PhotoStatus.PENDING : PhotoStatus.APPROVED,
      },
      select: { id: true, fileUrl: true, thumbnailUrl: true, status: true, uploadedAt: true },
    });
  }

  /** What a guest sees: approved photos only. */
  async listPublic(slug: string) {
    const event = await this.events.findPublic(slug);
    return this.prisma.photo.findMany({
      where: { eventId: event.id, status: PhotoStatus.APPROVED },
      orderBy: { uploadedAt: "desc" },
      select: { id: true, fileUrl: true, thumbnailUrl: true, uploaderName: true, uploadedAt: true },
    });
  }

  /** What the owner sees: everything, including what is waiting on them. */
  async listAll(eventId: string, ownerId: string) {
    await this.events.assertOwner(eventId, ownerId);
    return this.prisma.photo.findMany({
      where: { eventId },
      orderBy: { uploadedAt: "desc" },
    });
  }

  async setStatus(photoId: string, ownerId: string, status: PhotoStatus) {
    const photo = await this.findOwned(photoId, ownerId);
    return this.prisma.photo.update({ where: { id: photo.id }, data: { status } });
  }

  async remove(photoId: string, ownerId: string) {
    const photo = await this.findOwned(photoId, ownerId);
    await this.prisma.photo.delete({ where: { id: photo.id } });
    await this.storage.delete(photo.fileKey, photo.thumbnailKey);
    return { deleted: true };
  }

  private async findOwned(photoId: string, ownerId: string) {
    const photo = await this.prisma.photo.findUnique({ where: { id: photoId } });
    if (!photo) throw new NotFoundException("No such photo");
    await this.events.assertOwner(photo.eventId, ownerId);
    return photo;
  }
}
