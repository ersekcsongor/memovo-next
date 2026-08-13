import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.setGlobalPrefix("api");

  // DTOs decide what the API accepts; anything else is stripped before a handler sees it.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableCors({
    origin: config.get<string>("FRONTEND_ORIGIN", "http://localhost:3000").split(","),
    credentials: true,
  });

  const swagger = new DocumentBuilder()
    .setTitle("Memovo API")
    .setDescription("Events, guest photo uploads and contact leads.")
    .setVersion("0.1.0")
    .addBearerAuth()
    .build();
  SwaggerModule.setup("api/docs", app, SwaggerModule.createDocument(app, swagger));

  const port = config.get<number>("PORT", 4000);
  await app.listen(port);
  console.log(`API on http://localhost:${port}/api — docs at /api/docs`);
}

void bootstrap();
