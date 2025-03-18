import { Inject, Injectable } from "@nestjs/common"
import { CreateLinkInput, CreateLinkUsecase } from "./create-link.usecase"
import { LinkGateway } from "../../domain/gateway/link.gateway"
import { LinkEntity } from "../../domain/model/link.entity"

@Injectable()
export class CreateLinkInteractor implements CreateLinkUsecase {
  constructor(
    @Inject(LinkGateway)
    private readonly linkGateway: LinkGateway
  ) {}

  async execute(input: CreateLinkInput): Promise<LinkEntity> {
    const link = await this.linkGateway.create({
      name: input.name,
      description: input.description,
      password: input.password,
      coverImageUrl: input.coverImageUrl,
      userId: input.userId,
      nickname: input.nickname,
    })
    return link
  }
}

