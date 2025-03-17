import { Link } from "./interface/link.interface"

export class LinkEntity implements Link {
  id: number
  createdAt: Date
  updatedAt: Date

  name: string
  description?: string | null
  password?: string | null
  coverImageUrl?: string | null

  constructor(input: Link) {
    this.id = input.id;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.name = input.name;
    this.description = input.description;
    this.password = input.password;
    this.coverImageUrl = input.coverImageUrl;
  }

  static from(data: Link): LinkEntity {
    return new LinkEntity(data);
  }
}
