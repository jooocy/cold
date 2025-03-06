import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/db/prisma.service";
import { UserEntity } from "../domain/model/user.entity";
import { UserGateway } from "../domain/gateway/user.gateway";
import { PrismaClient } from "@prisma/client";
import { CreateUserGatewayDto, CreateUserWithOAuthGatewayDto } from "../domain/gateway/dto/create-user.gateway.dto";

@Injectable()
export class UserDsMapper implements UserGateway {
  private readonly userRepository: PrismaClient['user']

  constructor(private readonly prisma: PrismaService) {
    this.userRepository = prisma.user
  }

  private toEntity(user: any): UserEntity {
    return Object.assign(new UserEntity(), user);
  }

  async create(input: CreateUserGatewayDto): Promise<UserEntity> {
    const createdUser = await this.userRepository.create({
      data: input,
    });
    return this.toEntity(createdUser);
  }

  async findByIdOrNull(id: number): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return this.toEntity(user);
  }

  async findByEmailOrNull(email: string): Promise<UserEntity | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return this.toEntity(user);
  }

  async updateLastSignedInAt(id: number): Promise<UserEntity> {
    const updatedUser = await this.userRepository.update({
      where: { id },
      data: { lastSignedInAt: new Date() },
    });
    return this.toEntity(updatedUser);
  }

  async updateProfileImageUrl(id: number, profileImageUrl: string): Promise<UserEntity> {
    const updatedUser = await this.userRepository.update({
      where: { id },
      data: { profileImageUrl },
    });
    return this.toEntity(updatedUser);
  }

  async createWithOAuth(input: CreateUserWithOAuthGatewayDto): Promise<UserEntity> {
    const createdUser = await this.userRepository.create({
      data: {
        ...input,
        oauths: {
          create: input.oauths.map(oauth => ({
            provider: oauth.provider,
            accessToken: oauth.accessToken,
            refreshToken: oauth.refreshToken,
            expiresAt: oauth.expiresAt,
          })),
        },
      },
    });
    return this.toEntity(createdUser);
  }
}
