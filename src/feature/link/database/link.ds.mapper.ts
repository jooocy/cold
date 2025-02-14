import { Injectable } from "@nestjs/common";
import { LinkGateway } from "../domain/gateway/link.gateway";
import { PrismaClient } from "@prisma/client";
import { PrismaService } from "src/core/db/prisma.service";
import { CreateLinkGatewayDto } from "../domain/gateway/dto/create-link.gateway.dto";
import { LinkEntity } from "../domain/model/link.entity";

@Injectable()
export class LinkDsMapper implements LinkGateway{
  private readonly linkRepository: PrismaClient['link']

  constructor(private readonly prisma: PrismaService){
    this.linkRepository = prisma.link
  }

  async create(input: CreateLinkGatewayDto): Promise<LinkEntity>{
    const createdLink = await this.linkRepository.create({
      data: input
    })

    return createdLink;
  }
}