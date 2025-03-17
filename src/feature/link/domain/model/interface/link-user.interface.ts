export interface LinkUser {
  userId: number;
  linkId: number;
  createdAt: Date;
  updatedAt: Date;
  nickname: string;
  role: LinkUserRole;
  profileImageUrl?: string | null;
}

export enum LinkUserRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}




