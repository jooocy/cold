import { LinkEntity } from "../../domain/model/link.entity"

export interface CreateLinkUsecase {
  execute(input: CreateLinkInput): Promise<LinkEntity>
}

export interface CreateLinkInput {
  userId: number
  name: string
  description?: string
  password?: string
  coverImageUrl?: string
  nickname: string
}

export const CreateLinkUsecase = Symbol('CreateLinkUsecase')