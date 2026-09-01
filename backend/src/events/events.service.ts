import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { EventCategory } from "@prisma/client";
import { randomBytes } from "node:crypto";
import * as QRCode from "qrcode";
import { BillingService } from "../billing/billing.service";
import { PrismaService } from "../prisma/prisma.service";
import type { CreateEventDto, UpdateEventDto } from "./dto/event.dto";

@Injectable()
export class EventsService {
  /** Where a scanned code lands. FRONTEND_ORIGIN is a list; the first entry is the site. */
  private readonly siteOrigin: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly billing: BillingService,
    config: ConfigService,
  ) {
    this.siteOrigin = (config.get<string>("FRONTEND_ORIGIN", "http://localhost:3000").split(",")[0] ?? "")
      .trim()
      .replace(/\/+$/, "");
  }

  async create(ownerId: string, dto: CreateEventDto) {
    // A gallery is what the plan buys, so the plan is checked before one exists.
    await this.billing.assertCanCreateGallery(ownerId);

    return this.prisma.event.create({
      data: {
        name: dto.name,
        slug: await this.uniqueSlug(dto.name),
        ownerId,
        category: dto.category ?? EventCategory.OTHER,
        isPublic: dto.isPublic ?? true,
        requiresApproval: dto.requiresApproval ?? false,
        guestsCanView: dto.guestsCanView ?? true,
        expiresAt: dto.expiresAt ?? null,
      },
    });
  }

  /**
   * What the guest page may show. `isPublic` decides whether the gallery is listed
   * at all; uploads keep working on a private one, which is what a host wants when
   * the photos are for them alone.
   */
  async findPublic(slug: string) {
    const event = await this.prisma.event.findUnique({
      where: { slug },
      select: {
        id: true,
        slug: true,
        name: true,
        category: true,
        isPublic: true,
        requiresApproval: true,
        guestsCanView: true,
        expiresAt: true,
        createdAt: true,
      },
    });
    if (!event) throw new NotFoundException("No such gallery");
    return { ...event, isOpen: this.isOpen(event), uploadUrl: this.uploadUrl(event.slug) };
  }

  /** The address printed on the code. */
  uploadUrl(slug: string) {
    return `${this.siteOrigin}/u/${slug}`;
  }

  /**
   * The code carries a public address and nothing else, so both formats are open.
   * SVG renders in the page; the PNG is the one that gets printed and put on a table.
   */
  async qrSvg(slug: string) {
    await this.assertExists(slug);
    return QRCode.toString(this.uploadUrl(slug), {
      type: "svg",
      margin: 1,
      color: { dark: "#171114", light: "#ffffff" },
    });
  }

  async qrPng(slug: string, size: number) {
    await this.assertExists(slug);
    return QRCode.toBuffer(this.uploadUrl(slug), {
      type: "png",
      width: Math.min(Math.max(size, 128), 2048),
      margin: 2,
      color: { dark: "#171114", light: "#ffffff" },
    });
  }

  private async assertExists(slug: string) {
    const event = await this.prisma.event.findUnique({ where: { slug }, select: { id: true } });
    if (!event) throw new NotFoundException("No such gallery");
  }

  /** The owner's list, each row carrying its own share link and what waits on them. */
  async findMine(ownerId: string) {
    const events = await this.prisma.event.findMany({
      where: { ownerId },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { photos: true } } },
    });

    const pending = await this.prisma.photo.groupBy({
      by: ["eventId"],
      where: { event: { ownerId }, status: "PENDING" },
      _count: { _all: true },
    });
    const waiting = new Map(pending.map((row) => [row.eventId, row._count._all]));

    return events.map((event) => ({
      ...event,
      uploadUrl: this.uploadUrl(event.slug),
      pendingCount: waiting.get(event.id) ?? 0,
    }));
  }

  /** One owned gallery with everything the detail page needs. */
  async findOwned(id: string, ownerId: string) {
    await this.assertOwner(id, ownerId);
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: { _count: { select: { photos: true } } },
    });
    if (!event) throw new NotFoundException("No such event");

    const pending = await this.prisma.photo.count({ where: { eventId: id, status: "PENDING" } });
    return { ...event, uploadUrl: this.uploadUrl(event.slug), pendingCount: pending, isOpen: this.isOpen(event) };
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
