import { Inject, Injectable } from "@nestjs/common";
import { Question } from "../../domain/model/interface/question.interface";
import { QuestionGateway } from "../../domain/gateway/question.gateway";
import { CreateQuestionUsecase } from "./create-question.usecase";
import { OpenAiService } from "src/feature/open-ai/open-ai.service";
import { VerifyLinkUserUsecase } from "src/feature/link/usecase/verify-link-user/verify-link-user.usecase";
@Injectable()
export class CreateQuestionInteractor implements CreateQuestionUsecase {
  constructor(
    @Inject(QuestionGateway)
    private readonly questionGateway: QuestionGateway,
    private readonly openAiService: OpenAiService,
    @Inject(VerifyLinkUserUsecase)
    private readonly verifyLinkUserUsecase: VerifyLinkUserUsecase,
  ) {}

  async execute(linkId: number, userId: number): Promise<Question> {
    const isLinkUser = await this.verifyLinkUserUsecase.execute(linkId, userId);
    if (!isLinkUser) {
      throw new Error('Failed to generate question');
    }
    const question = await this.openAiService.generateQuestion();
    if (!question) {
      throw new Error('Failed to generate question');
    }
    return this.questionGateway.create({
      content: question,
      linkId,
    });
  }
}