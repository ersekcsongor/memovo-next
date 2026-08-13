import { createParamDecorator, type ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import type { AuthUser } from "./auth.service";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}

/** Hands the route the user the strategy already resolved. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => ctx.switchToHttp().getRequest().user,
);
