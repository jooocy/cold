import { AnswerEntity } from "../answer.entity";

export interface Question {
  id: number;
  content: string;
  isResolved: boolean;
  authorId?: number | null;
  createdAt: Date;
  updatedAt: Date;
  answers?: AnswerEntity[];
  linkId: number;
}

