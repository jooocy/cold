import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { VerifyLinkUserUsecase } from "./verify-link-user.usecase";
import { LinkUserGateway } from "../../domain/gateway/link-user.gateway";

@Injectable()
export class VerifyLinkUserInteractor implements VerifyLinkUserUsecase {
  constructor(
    @Inject(LinkUserGateway)
    private readonly linkUserGateway: LinkUserGateway,
  ) {}

  async execute(linkId: number, userId: number): Promise<boolean> {
    const linkUser = await this.linkUserGateway.findByLinkIdAndUserIdOrNull(linkId, userId);
    if (!linkUser) {
      return false;
    }
    return true;
  }
}