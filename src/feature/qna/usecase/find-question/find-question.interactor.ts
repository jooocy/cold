import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { QuestionGateway } from "../../domain/gateway/question.gateway";
import { QuestionEntity } from "../../domain/model/question.entity";
import { FindQuestionUsecase } from "./find-question.usecase";

@Injectable()
export class FindQuestionInteractor implements FindQuestionUsecase {
  constructor(
    @Inject(QuestionGateway)
    private readonly questionGateway: QuestionGateway
  ) {}

  async execute(id: number): Promise<QuestionEntity> {
    const question = await this.questionGateway.findByIdOrNull(id);
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

  async executeManyByLinkId(linkId: number): Promise<QuestionEntity[]> {
    return this.questionGateway.findManyByLinkId(linkId);
  }

  async executeManyWithAnswersByLinkId(linkId: number): Promise<QuestionEntity[]> {
    return this.questionGateway.findManyWithAnswersByLinkId(linkId);
  }
}
