import { Controller, Get, Post, Body, Inject, UseGuards, Param } from "@nestjs/common";
import { CreateQuestionUsecase } from "../usecase/create-question/create-question.usecase";
import { CreateQuestionGatewayDto } from "../domain/gateway/dtos/create-question.gateway.dto";
import { CurrentUser } from "src/feature/user/decorator/current-user.decorator";
import { JwtAuthGuard } from "src/common/jwt/jwt-guard";
import { FindQuestionUsecase } from "../usecase/find-question/find-question.usecase";

@Controller('links/:linkId/qnas')
export class QnaController {
  constructor(
    @Inject(CreateQuestionUsecase)
    private readonly createQuestionUsecase: CreateQuestionUsecase,
    @Inject(FindQuestionUsecase)
    private readonly findQuestionUsecase: FindQuestionUsecase,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createQuestion(
    @Param('linkId') linkId: number,
    @CurrentUser() user: CurrentUser
  ) {
    const question = await this.createQuestionUsecase.execute(linkId, user.id);
    return {
      data: question,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async questionsWithAnswers(
    @Param('linkId') linkId: number,
    @CurrentUser() user: CurrentUser
  ) {
    const questions = await this.findQuestionUsecase.executeManyWithAnswersByLinkId(linkId, user.id);
    return {
      data: questions,
    };
  }

  @Get('dummy')
  async dummyQuestions() {
    return {
      data: [
        {
          id: 1,
          content: '우리가족이 더 행복해 지려면 어떤 점을 바꾸면좋겠어?',
          authorId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        answers: [
          {
            id: 1,
            content: '가족끼리 함께할 수 있는 취미를 하나 만들어 보는것 어떨까 같이 주말마다 등산이나 낚시를 따라오면 참 좋겠다~',
            authorId: 2,
            author: {
              id: 2,
              nickname: '아빠고래',
            },
            questionId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: 2,
            content: '가족끼리 더 많이 칭찬해 주고, 애정표현을 자주해주면 좋겠어! 너희 들은 아빠닮아서그런지 너무 무뚝뚝해 그리고 건강해야 행복할 수 있으니까 우리모두 서로 건강 잘챙겨주자',
            authorId: 3,
            author: {
              id: 3,
              nickname: '엄마고래',
            },
            questionId: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    ],
  };  
  }
}