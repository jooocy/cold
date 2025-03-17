import { LinkUser, LinkUserRole } from "./interface/link-user.interface";

export class LinkUserEntity implements LinkUser {
  userId: number;
  linkId: number;
  createdAt: Date;
  updatedAt: Date;
  nickname: string;
  role: LinkUserRole;
  profileImageUrl?: string | null;

  constructor(input: LinkUser) {
    this.userId = input.userId;
    this.linkId = input.linkId;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.nickname = input.nickname;
    this.role = input.role;
    this.profileImageUrl = input.profileImageUrl;
  }

  static from(input: LinkUser): LinkUserEntity {
    return new LinkUserEntity(input);
  }
}