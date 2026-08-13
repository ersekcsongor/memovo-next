import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { resolve } from "node:path";
import { AuthModule } from "./auth/auth.module";
import { EventsModule } from "./events/events.module";
import { LeadsModule } from "./leads/leads.module";
import { MailModule } from "./mail/mail.module";
import { PhotosModule } from "./photos/photos.module";
import { PrismaModule } from "./prisma/prisma.module";
import { StorageModule } from "./storage/storage.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // Guest uploads and the contact form are public, so every route carries a ceiling.
    ThrottlerModule.forRoot([{ ttl: 60_000, limit: 60 }]),
    // Uploaded photos are served straight off disk at /uploads.
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          rootPath: resolve(config.get<string>("UPLOAD_DIR", "./uploads")),
          serveRoot: "/uploads",
          serveStaticOptions: { index: false, fallthrough: false },
        },
      ],
    }),
    PrismaModule,
    StorageModule,
    MailModule,
    AuthModule,
    EventsModule,
    PhotosModule,
    LeadsModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
