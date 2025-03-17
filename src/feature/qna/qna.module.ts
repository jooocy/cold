import { QnaController } from "./presentation/qna.controller";
import { Module } from "@nestjs/common";
import { QuestionGateway } from "./domain/gateway/question.gateway";
import { QuestionDsMapper } from "./database/question.ds.mapper";
import { AnswerGateway } from "./domain/gateway/answer.gateway";
import { AnswerDsMapper } from "./database/answer.ds.mapper";
import { FindQuestionUsecase } from "./usecase/find-question/find-question.usecase";
import { FindQuestionInteractor } from "./usecase/find-question/find-question.interactor";
import { FindAnswerUsecase } from "./usecase/find-answer/find-answer.usecase";
import { FindAnswerInteractor } from "./usecase/find-answer/find-answer.interactor";
import { PrismaModule } from "src/core/db/prisma.module";
import { LinkModule } from "../link/link.module";
import { OpenAiModule } from "../open-ai/open-ai.module";
import { CreateQuestionUsecase } from "./usecase/create-question/create-question.usecase";
import { CreateQuestionInteractor } from "./usecase/create-question/create-question.interactor";

@Module({
  imports: [PrismaModule, LinkModule, OpenAiModule],
  controllers: [QnaController],
  providers: [
    {
      provide: QuestionGateway,
      useClass: QuestionDsMapper,
    },
    {
      provide: AnswerGateway,
      useClass: AnswerDsMapper,
    },
    {
      provide: FindQuestionUsecase,
      useClass: FindQuestionInteractor,
    },
    {
      provide: FindAnswerUsecase,
      useClass: FindAnswerInteractor,
    },
    {
      provide: CreateQuestionUsecase,
      useClass: CreateQuestionInteractor,
    },
  ],
})
export class QnaModule {}
