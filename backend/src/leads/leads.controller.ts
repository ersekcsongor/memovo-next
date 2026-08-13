import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { LeadStatus } from "@prisma/client";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateLeadDto, UpdateLeadStatusDto } from "./dto/lead.dto";
import { LeadsService } from "./leads.service";

@ApiTags("leads")
@Controller("leads")
export class LeadsController {
  constructor(private readonly leads: LeadsService) {}

  @Post()
  // The contact form is open to the world, so it gets the tightest ceiling in the app.
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @ApiOperation({ summary: "Contact form submission; sends a confirmation" })
  create(@Body() dto: CreateLeadDto) {
    return this.leads.create(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: "status", enum: LeadStatus, required: false })
  @ApiOperation({ summary: "Leads for the admin view" })
  findAll(@Query("status") status?: LeadStatus) {
    return this.leads.findAll(status);
  }

  @Patch(":id/status")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Move a lead through the pipeline" })
  setStatus(@Param("id") id: string, @Body() dto: UpdateLeadStatusDto) {
    return this.leads.setStatus(id, dto.status);
  }
}
