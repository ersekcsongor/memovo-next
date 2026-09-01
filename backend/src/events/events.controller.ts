import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  StreamableFile,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiProduces, ApiQuery, ApiTags } from "@nestjs/swagger";
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

  @Get("owned/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "One owned gallery, with its share link and pending count" })
  findOwned(@Param("id") id: string, @CurrentUser() user: AuthUser) {
    return this.events.findOwned(id, user.id);
  }

  /* The QR carries a public address, so the images are public too. Anyone who can
     read the code can already reach the page it points at. */

  @Get(":slug/qr.svg")
  @Header("Content-Type", "image/svg+xml")
  @Header("Cache-Control", "public, max-age=3600")
  @ApiProduces("image/svg+xml")
  @ApiOperation({ summary: "The gallery's QR code, for the screen" })
  qrSvg(@Param("slug") slug: string) {
    return this.events.qrSvg(slug);
  }

  @Get(":slug/qr.png")
  @Header("Content-Type", "image/png")
  @Header("Cache-Control", "public, max-age=3600")
  @ApiProduces("image/png")
  @ApiQuery({ name: "size", required: false, description: "Pixels per side, 128 to 2048" })
  @ApiOperation({ summary: "The gallery's QR code, for printing" })
  async qrPng(
    @Param("slug") slug: string,
    @Query("size", new ParseIntPipe({ optional: true })) size?: number,
  ) {
    const png = await this.events.qrPng(slug, size ?? 1024);
    // Nest hands a Buffer straight to the response when the type is already set.
    return new StreamableFile(png);
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
