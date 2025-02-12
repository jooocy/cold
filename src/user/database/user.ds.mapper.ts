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

  async findById(id: number): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }
}