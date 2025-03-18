import { Injectable } from "@nestjs/common";
import { LinkGateway } from "../domain/gateway/link.gateway";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "src/core/db/prisma.service";
import { CreateLinkGatewayDto } from "../domain/gateway/dto/create-link.gateway.dto";
import { LinkEntity } from "../domain/model/link.entity";
import { LinkUserRole } from "../domain/model/interface/link-user.interface";

@Injectable()
export class LinkDsMapper implements LinkGateway{
  private readonly linkRepository: PrismaClient['link']

  constructor(private readonly prisma: PrismaService){
    this.linkRepository = prisma.link
  }

  async create(input: CreateLinkGatewayDto): Promise<LinkEntity> {
    const link = await this.prisma.$transaction(async (tx) => {
      // 1. Link 생성
      const link = await tx.link.create({
        data: {
          name: input.name,
          description: input.description,
          password: input.password,
          coverImageUrl: input.coverImageUrl,
        }
      });

      // 2. LinkUser 생성
      await tx.linkUser.create({
        data: {
          linkId: link.id,
          userId: input.userId,
          role: LinkUserRole.OWNER,
          nickname: input.nickname,
        }
      });

      return link;
    });

    return LinkEntity.from(link);
  }

  async findByIdOrNull(id: number): Promise<LinkEntity | null> {
    const link = await this.linkRepository.findUnique({
      where: { id },
    });
    return link ? LinkEntity.from(link) : null;
  }
}