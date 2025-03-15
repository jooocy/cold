import { AnswerEntity } from "../../domain/model/answer.entity";

export interface FindAnswerUsecase {
  execute(id: number): Promise<AnswerEntity>;
  executeManyByQuestionId(questionId: number): Promise<AnswerEntity[]>;
}

export const FindAnswerUsecase = Symbol('FindAnswerUsecase');