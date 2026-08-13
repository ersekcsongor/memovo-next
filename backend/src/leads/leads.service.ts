import { Injectable, NotFoundException } from "@nestjs/common";
import { LeadStatus } from "@prisma/client";
import { MailService } from "../mail/mail.service";
import { PrismaService } from "../prisma/prisma.service";
import type { CreateLeadDto } from "./dto/lead.dto";

@Injectable()
export class LeadsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mail: MailService,
  ) {}

  async create(dto: CreateLeadDto) {
    const lead = await this.prisma.lead.create({
      data: {
        name: dto.name.trim(),
        email: dto.email.trim().toLowerCase(),
        subject: dto.subject?.trim() || null,
        message: dto.message.trim(),
        locale: dto.locale ?? "en",
      },
    });

    // The row is already saved, so the visitor gets their answer whatever the mailer does.
    await Promise.all([
      this.mail.sendLeadConfirmation(lead),
      this.mail.sendLeadNotification(lead),
    ]);

    return { id: lead.id, createdAt: lead.createdAt };
  }

  findAll(status?: LeadStatus) {
    return this.prisma.lead.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: "desc" },
    });
  }

  async setStatus(id: string, status: LeadStatus) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });
    if (!lead) throw new NotFoundException("No such lead");
    return this.prisma.lead.update({ where: { id }, data: { status } });
  }
}
