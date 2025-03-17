export interface Link {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description?: string | null;
  password?: string | null;
  coverImageUrl?: string | null;
}