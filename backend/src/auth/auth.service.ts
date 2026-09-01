import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import type { Plan } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import type { LoginDto, RegisterDto } from "./dto/auth.dto";

/**
 * Carries the plan as well as the identity: the account page and every gate read
 * it, so resolving it once on the request saves a second query everywhere.
 */
export type AuthUser = {
  id: string;
  email: string;
  name: string;
  plan: Plan;
  planExpiresAt: Date | null;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException("That email already has an account");

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        name: dto.name,
        password: await bcrypt.hash(dto.password, 12),
      },
    });
    return this.sign(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    // One message for both branches, so the response cannot be used to probe for accounts.
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException("Email or password is wrong");
    }
    return this.sign(user);
  }

  private sign(user: { id: string; email: string; name: string; plan: Plan; planExpiresAt: Date | null }) {
    return {
      accessToken: this.jwt.sign({ sub: user.id, email: user.email }),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        planExpiresAt: user.planExpiresAt,
      },
    };
  }
}
