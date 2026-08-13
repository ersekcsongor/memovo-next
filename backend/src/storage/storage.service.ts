import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import sharp from "sharp";

export type StoredImage = {
  fileKey: string;
  fileUrl: string;
  thumbnailKey: string;
  thumbnailUrl: string;
};

/**
 * Every file operation in the app goes through here. Nothing else knows where the
 * bytes live, so swapping the disk for object storage stays a change to this file.
 */
@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly root: string;
  private readonly publicUrl: string;

  constructor(config: ConfigService) {
    this.root = resolve(config.get<string>("UPLOAD_DIR", "./uploads"));
    this.publicUrl = config.get<string>("PUBLIC_URL", "http://localhost:4000").replace(/\/+$/, "");
  }

  get uploadRoot() {
    return this.root;
  }

  /** Writes the original plus a 480px thumbnail, both under the event's folder. */
  async saveImage(eventId: string, file: { buffer: Buffer; originalname: string }): Promise<StoredImage> {
    const id = randomUUID();
    const ext = (extname(file.originalname) || ".jpg").toLowerCase();
    const fileKey = `${eventId}/${id}${ext}`;
    const thumbnailKey = `${eventId}/${id}-thumb.webp`;

    await this.write(fileKey, file.buffer);
    const thumbnail = await sharp(file.buffer)
      .rotate()
      .resize(480, 480, { fit: "inside", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    await this.write(thumbnailKey, thumbnail);

    return {
      fileKey,
      thumbnailKey,
      fileUrl: this.urlFor(fileKey),
      thumbnailUrl: this.urlFor(thumbnailKey),
    };
  }

  urlFor(key: string) {
    return `${this.publicUrl}/uploads/${key}`;
  }

  /** Missing files are fine to delete twice; the row going away is what matters. */
  async delete(...keys: (string | null | undefined)[]) {
    for (const key of keys) {
      if (!key) continue;
      try {
        await unlink(join(this.root, key));
      } catch (error) {
        this.logger.warn(`could not delete ${key}: ${(error as Error).message}`);
      }
    }
  }

  private async write(key: string, data: Buffer) {
    const target = join(this.root, key);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, data);
  }
}
