import { AnswerEntity } from "./answer.entity";
import { UserEntity } from "src/feature/user/domain/model/user.entity";
import { Question } from "./interface/question.interface";

export class QuestionEntity implements Question{
  id: number;
  createdAt: Date;
  updatedAt: Date;

  content: string;
  authorId?: number | null;
  author?: UserEntity;
  answers?: AnswerEntity[];
  isResolved: boolean;
  linkId: number;
  
  resolve() {
    this.isResolved = true;
  }

  constructor(input: Question) {
    this.id = input.id;
    this.content = input.content;
    this.isResolved = input.isResolved;
    this.authorId = input.authorId;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
    this.answers = input.answers;
    this.linkId = input.linkId;
  }

  static from(data: Question): QuestionEntity {
    return new QuestionEntity(data);
  }
} 