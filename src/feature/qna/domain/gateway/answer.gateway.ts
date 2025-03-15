import { AnswerEntity } from "../model/answer.entity";

export interface AnswerGateway {
  findManyByQuestionId(questionId: number): Promise<AnswerEntity[]>;
  findByIdOrNull(id: number): Promise<AnswerEntity | null>;
}

export const AnswerGateway = Symbol('AnswerGateway');