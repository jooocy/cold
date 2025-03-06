import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/core/db/prisma.service";
import { UserEntity } from "../domain/model/user.entity";
import { UserGateway } from "../domain/gateway/user.gateway";
import { PrismaClient } from "@prisma/client";
import { CreateUserGatewayDto, CreateUserWithOAuthGatewayDto } from "../domain/gateway/dto/create-user.gateway.dto";
import { UpdateUserGatewayDto } from "../domain/gateway/dto/update-user.gateway.dto";
import { UserOAuthEntity } from "../domain/model/user-oauth.entity";

@Injectable()
export class UserDsMapper implements UserGateway {
  private readonly userRepository: PrismaClient['user']
  private readonly userOAuthRepository: PrismaClient['userOAuth']

  constructor(private readonly prisma: PrismaService) {
    this.userRepository = prisma.user
    this.userOAuthRepository = prisma.userOAuth
  }

  private toEntity(user: any): UserEntity {
    return Object.assign(new UserEntity(), user);
  }

  private toUserOAuthEntity(userOAuth: any): UserOAuthEntity {
    return Object.assign(new UserOAuthEntity(), userOAuth);
  }

  async create(input: CreateUserGatewayDto): Promise<UserEntity> {
    const createdUser = await this.userRepository.create({
      data: input,
    });
    return this.toEntity(createdUser);
  }

  async findByIdOrNull(id: number): Promise<UserEntity | null> {
    const user = await this.userRepository.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return this.toEntity(user);
  }

  async findByIdWithOAuthsOrNull(id: number): Promise<UserEntity | null> {
    const user = await this.userRepository.findUnique({
      where: { id },
      include: {
        oauths: true,
      },  
    });

    if (!user) {
      return null;
    }

    return this.toEntity(user);
  }

  async findByEmailOrNull(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findUnique({
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


  async updateOAuth(input: UpdateUserGatewayDto): Promise<UserOAuthEntity> {
    const updatedUserOAuth = await this.userOAuthRepository.update({
      where: { userId_provider: { userId: input.userId, provider: input.provider } },
      data: {
        accessToken: input.accessToken,
        refreshToken: input.refreshToken,
        expiresAt: input.expiresAt,
      },
    });

    return this.toUserOAuthEntity(updatedUserOAuth);
  }
}
