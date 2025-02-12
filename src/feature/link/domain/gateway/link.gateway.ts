import { LinkEntity } from "../model/link.entity";
import { CreateLinkGatewayDto } from "./dto/create-link.gateway.dto";

export interface LinkGateway {
  create(input: CreateLinkGatewayDto): Promise<LinkEntity>
}

export const LinkGateway = Symbol('LinkGateway')