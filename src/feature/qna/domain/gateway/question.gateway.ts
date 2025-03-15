import { QuestionEntity } from "../model/question.entity";

export interface QuestionGateway {
  findByIdOrNull(id: number): Promise<QuestionEntity | null>;
  findManyByLinkId(linkId: number): Promise<QuestionEntity[]>;
  findManyWithAnswersByLinkId(linkId: number): Promise<QuestionEntity[]>;
}

export const QuestionGateway = Symbol('QuestionGateway');