import { QuestionEntity } from "../model/question.entity";
import { CreateQuestionGatewayDto } from "./dtos/create-question.gateway.dto";

export interface QuestionGateway {
  create(input: CreateQuestionGatewayDto): Promise<QuestionEntity>;
  findByIdOrNull(id: number): Promise<QuestionEntity | null>;
  findManyByLinkId(linkId: number): Promise<QuestionEntity[]>;
  findManyWithAnswersByLinkId(linkId: number): Promise<QuestionEntity[]>;
}

export const QuestionGateway = Symbol('QuestionGateway');