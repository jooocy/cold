import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { AnswerEntity } from "../../domain/model/answer.entity";
import { FindAnswerUsecase } from "./find-answer.usecase";
import { AnswerGateway } from "../../domain/gateway/answer.gateway";

@Injectable()
export class FindAnswerInteractor implements FindAnswerUsecase {
  constructor(
    @Inject(AnswerGateway)
    private readonly answerGateway: AnswerGateway
  ) {}

  async execute(id: number): Promise<AnswerEntity> {
    const answer = await this.answerGateway.findByIdOrNull(id);
    if (!answer) {
      throw new NotFoundException('Answer not found');
    }
    return answer;
  }

  async executeManyByQuestionId(questionId: number): Promise<AnswerEntity[]> {
    return this.answerGateway.findManyByQuestionId(questionId);
  }
}