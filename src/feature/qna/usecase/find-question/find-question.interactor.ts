import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { QuestionGateway } from "../../domain/gateway/question.gateway";
import { QuestionEntity } from "../../domain/model/question.entity";
import { FindQuestionUsecase } from "./find-question.usecase";
import { LinkUserGateway } from "src/feature/link/domain/gateway/link-user.gateway";
import { VerifyLinkUserUsecase } from "src/feature/link/usecase/verify-link-user/verify-link-user.usecase";
@Injectable()
export class FindQuestionInteractor implements FindQuestionUsecase {
  constructor(
    @Inject(QuestionGateway)
    private readonly questionGateway: QuestionGateway,
    @Inject(VerifyLinkUserUsecase)
    private readonly verifyLinkUserUsecase: VerifyLinkUserUsecase,
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

  async executeManyWithAnswersByLinkId(linkId: number, userId: number): Promise<QuestionEntity[]> {
    const isLinkUser = await this.verifyLinkUserUsecase.execute(linkId, userId);
    if (!isLinkUser) {
      throw new NotFoundException('Link user not found');
    }
    return this.questionGateway.findManyWithAnswersByLinkId(linkId);
  }
}
