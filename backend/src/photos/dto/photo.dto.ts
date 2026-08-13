import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PhotoStatus } from "@prisma/client";
import { IsEnum, IsOptional, IsString, MaxLength } from "class-validator";

export class UploadPhotoDto {
  @ApiPropertyOptional({ description: "Shown under the photo in the gallery." })
  @IsOptional()
  @IsString()
  @MaxLength(80)
  uploaderName?: string;
}

export class UpdatePhotoStatusDto {
  @ApiProperty({ enum: PhotoStatus })
  @IsEnum(PhotoStatus)
  status!: PhotoStatus;
}
