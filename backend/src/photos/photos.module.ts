import { Module } from "@nestjs/common";
import { EventsModule } from "../events/events.module";
import { PhotosController } from "./photos.controller";
import { PhotosService } from "./photos.service";

@Module({
  imports: [EventsModule],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
