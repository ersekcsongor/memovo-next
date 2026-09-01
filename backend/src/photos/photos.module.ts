import { Module } from "@nestjs/common";
import { BillingModule } from "../billing/billing.module";
import { EventsModule } from "../events/events.module";
import { PhotosController } from "./photos.controller";
import { PhotosService } from "./photos.service";

@Module({
  imports: [EventsModule, BillingModule],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
