import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { type AuthUser } from "../auth/auth.service";
import { CurrentUser, JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CreateEventDto, UpdateEventDto } from "./dto/event.dto";
import { EventsService } from "./events.service";

@ApiTags("events")
@Controller("events")
export class EventsController {
  constructor(private readonly events: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create an event; the slug is generated" })
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateEventDto) {
    return this.events.create(user.id, dto);
  }

  @Get("mine")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Events owned by the current account" })
  mine(@CurrentUser() user: AuthUser) {
    return this.events.findMine(user.id);
  }

  @Get(":slug")
  @ApiOperation({ summary: "Public details for a gallery page" })
  findOne(@Param("slug") slug: string) {
    return this.events.findPublic(slug);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Change settings on an owned event" })
  update(@Param("id") id: string, @CurrentUser() user: AuthUser, @Body() dto: UpdateEventDto) {
    return this.events.update(id, user.id, dto);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete an owned event and its photos" })
  remove(@Param("id") id: string, @CurrentUser() user: AuthUser) {
    return this.events.remove(id, user.id);
  }
}
