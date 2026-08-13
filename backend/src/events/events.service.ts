import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes } from "node:crypto";
import { PrismaService } from "../prisma/prisma.service";
import type { CreateEventDto, UpdateEventDto } from "./dto/event.dto";

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(ownerId: string, dto: CreateEventDto) {
    return this.prisma.event.create({
      data: {
        name: dto.name,
        slug: await this.uniqueSlug(dto.name),
        ownerId,
        isPublic: dto.isPublic ?? true,
        requiresApproval: dto.requiresApproval ?? false,
        expiresAt: dto.expiresAt ?? null,
      },
    });
  }

  /** What the gallery page may show a guest: no owner, no counts of hidden photos. */
  async findPublic(slug: string) {
    const event = await this.prisma.event.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        name: true,
        isPublic: true,
        requiresApproval: true,
        expiresAt: true,
        createdAt: true,
      },
    });
    if (!event || !event.isPublic) throw new NotFoundException("No such gallery");
    return event;
  }

  findMine(ownerId: string) {
    return this.prisma.event.findMany({
      where: { ownerId },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { photos: true } } },
    });
  }

  async update(id: string, ownerId: string, dto: UpdateEventDto) {
    await this.assertOwner(id, ownerId);
    return this.prisma.event.update({ where: { id }, data: dto });
  }

  async remove(id: string, ownerId: string) {
    await this.assertOwner(id, ownerId);
    await this.prisma.event.delete({ where: { id } });
    return { deleted: true };
  }

  /** Every owner-only route funnels through here, so the check cannot be forgotten. */
  async assertOwner(id: string, ownerId: string) {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException("No such event");
    if (event.ownerId !== ownerId) throw new ForbiddenException("That event belongs to someone else");
    return event;
  }

  /** Uploads close once the gallery is past its date. */
  isOpen(event: { expiresAt: Date | null }) {
    return !event.expiresAt || event.expiresAt.getTime() > Date.now();
  }

  private async uniqueSlug(name: string) {
    const base =
      name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 40) || "event";

    // A short random tail keeps one couple's gallery from being guessable from another's.
    for (let attempt = 0; attempt < 5; attempt++) {
      const slug = `${base}-${randomBytes(3).toString("hex")}`;
      const taken = await this.prisma.event.findUnique({ where: { slug } });
      if (!taken) return slug;
    }
    return `${base}-${randomBytes(6).toString("hex")}`;
  }
}
