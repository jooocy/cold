import { Injectable } from "@nestjs/common";
import { LinkUserGateway } from "../domain/gateway/link-user.gateway";
import { LinkUserEntity } from "../domain/model/link-user.entity";
import { LinkUser, PrismaClient } from "@prisma/client";
import { PrismaService } from "src/core/db/prisma.service";
import { LinkUserRole } from "../domain/model/interface/link-user.interface";
@Injectable()
export class LinkUserDsMapper implements LinkUserGateway {
  private readonly linkUserRepository: PrismaClient['linkUser'];

  constructor(private readonly prisma: PrismaService) {
    this.linkUserRepository = prisma.linkUser;
  }

  private toEntity(linkUser: LinkUser): LinkUserEntity {
    return new LinkUserEntity({
      userId: linkUser.userId,
      linkId: linkUser.linkId,
      createdAt: linkUser.createdAt,
      updatedAt: linkUser.updatedAt,
      nickname: linkUser.nickname,
      role: linkUser.role as LinkUserRole,
      profileImageUrl: linkUser.profileImageUrl,
    });
  }

  async findByLinkIdAndUserIdOrNull(linkId: number, userId: number): Promise<LinkUserEntity | null> {
    const linkUser = await this.linkUserRepository.findUnique({
      where: { linkId_userId: { linkId, userId } },
    });

    if (!linkUser) {
      return null;
    }

    return this.toEntity(linkUser);
  }
}
