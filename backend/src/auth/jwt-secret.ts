import { ConfigService } from "@nestjs/config";

/**
 * The signing key has no default on purpose: a fallback committed to the repo is
 * public knowledge, and anyone holding it can mint valid tokens. Missing key, no boot.
 */
export function requireJwtSecret(config: ConfigService): string {
  const secret = config.get<string>("JWT_SECRET");
  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET is missing or shorter than 32 characters. Set it in backend/.env to a long random string.",
    );
  }
  return secret;
}
