import { LinkUserEntity } from "../model/link-user.entity"

export interface LinkUserGateway {
  findByLinkIdAndUserIdOrNull(linkId: number, userId: number): Promise<LinkUserEntity | null>;
}

export const LinkUserGateway = Symbol('LinkUserGateway');