import { QuestionEntity } from "../../domain/model/question.entity";

export interface FindQuestionUsecase {
  execute(id: number): Promise<QuestionEntity>;
  executeManyByLinkId(linkId: number): Promise<QuestionEntity[]>;
  executeManyWithAnswersByLinkId(linkId: number, userId: number): Promise<QuestionEntity[]>;
}

export const FindQuestionUsecase = Symbol('FindQuestionUsecase');
