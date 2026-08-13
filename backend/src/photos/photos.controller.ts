import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Throttle } from "@nestjs/throttler";
import { type AuthUser } from "../auth/auth.service";
import { CurrentUser, JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdatePhotoStatusDto, UploadPhotoDto } from "./dto/photo.dto";
import { PhotosService } from "./photos.service";

@ApiTags("photos")
@Controller()
export class PhotosController {
  constructor(private readonly photos: PhotosService) {}

  @Post("events/:slug/photos")
  // Public endpoint at a party: generous enough for a real guest, tight enough for a script.
  @Throttle({ default: { ttl: 60_000, limit: 20 } })
  @UseInterceptors(FileInterceptor("file", { limits: { fileSize: 15 * 1024 * 1024 } }))
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      required: ["file"],
      properties: {
        file: { type: "string", format: "binary" },
        uploaderName: { type: "string" },
      },
    },
  })
  @ApiOperation({ summary: "Guest upload; no account needed" })
  upload(
    @Param("slug") slug: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadPhotoDto,
  ) {
    return this.photos.upload(slug, file, dto.uploaderName);
  }

  @Get("events/:slug/photos")
  @ApiOperation({ summary: "Approved photos for the public gallery" })
  listPublic(@Param("slug") slug: string) {
    return this.photos.listPublic(slug);
  }

  @Get("events/:id/photos/all")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Every photo, for the owner's moderation view" })
  listAll(@Param("id") id: string, @CurrentUser() user: AuthUser) {
    return this.photos.listAll(id, user.id);
  }

  @Patch("photos/:id/status")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Approve or reject a photo" })
  setStatus(@Param("id") id: string, @CurrentUser() user: AuthUser, @Body() dto: UpdatePhotoStatusDto) {
    return this.photos.setStatus(id, user.id, dto.status);
  }

  @Delete("photos/:id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete a photo and its files" })
  remove(@Param("id") id: string, @CurrentUser() user: AuthUser) {
    return this.photos.remove(id, user.id);
  }
}
