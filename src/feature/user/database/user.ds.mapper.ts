import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/core/db/prisma.service";
import { UserEntity } from "../domain/model/user.entity";
import { UserGateway } from "../domain/gateway/user.gateway";
import { PrismaClient } from "@prisma/client";
import { CreateUserGatewayDto } from "../domain/gateway/dto/create-user.gateway.dto";

@Injectable()
export class UserDsMapper implements UserGateway {
  private readonly userRepository: PrismaClient['user']

  constructor(private readonly prisma: PrismaService) {
    this.userRepository = prisma.user
  }

  async create(input: CreateUserGatewayDto): Promise<UserEntity> {
    const createdUser = await this.userRepository.create({
      data: input,
    });

    return createdUser;
  }

  async findById(id: number): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }

  async updateLastSignedInAt(id: number): Promise<UserEntity> {
    const updatedUser = await this.userRepository.update({
      where: { id },
      data: { lastSignedInAt: new Date() },
    });

    return updatedUser;
  }

  async updateProfileImageUrl(id: number, profileImageUrl: string): Promise<UserEntity> {
    const updatedUser = await this.userRepository.update({
      where: { id },
      data: { profileImageUrl },
    });

    return updatedUser;
  }
}