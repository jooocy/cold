import { Role } from "src/common/interface/interfaces/role";

export interface DearLinkAccessTokenRequest {
  id: number;
  email: string;
  roles: Role;
}

export interface DearLinkRefreshTokenRequest {
  id: number;
  roles: Role.USER;
}
