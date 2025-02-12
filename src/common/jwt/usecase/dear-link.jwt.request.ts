import { Role } from "src/common/role/role";

export interface DearLinkAccessTokenRequest {
  id: number;
  email: string;
  roles: Role;
}

export interface DearLinkRefreshTokenRequest {
  id: number;
  roles: Role.USER;
}
