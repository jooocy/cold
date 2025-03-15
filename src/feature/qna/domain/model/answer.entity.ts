import { Answer } from "./interface/answer.interface";

export class AnswerEntity implements Answer{
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  questionId: number;
  userId: number;
  
  constructor(input: Answer) {
    this.id = input.id;
    this.content = input.content;
    this.questionId = input.questionId;
    this.userId = input.userId;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  static from(data: Answer): AnswerEntity {
    return new AnswerEntity(data);
  }
} 