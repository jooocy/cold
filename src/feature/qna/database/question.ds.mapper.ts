import { Injectable } from "@nestjs/common";
import { QuestionGateway } from "../domain/gateway/question.gateway";
import { QuestionEntity } from "../domain/model/question.entity";
import { PrismaClient, Question, Answer, Link } from "@prisma/client";
import { PrismaService } from "src/core/db/prisma.service";
import { AnswerEntity } from "../domain/model/answer.entity";
import { LinkEntity } from "src/feature/link/domain/model/link.entity";
import { CreateQuestionGatewayDto } from "../domain/gateway/dtos/create-question.gateway.dto";

@Injectable()
export class QuestionDsMapper implements QuestionGateway {
  private readonly questionRepository: PrismaClient['question'];

  constructor(private readonly prisma: PrismaService){
    this.questionRepository = prisma.question;
  }

  private toEntity(question: Question & { answers?: Answer[]}): QuestionEntity {
    return new QuestionEntity({
      id: question.id,
      content: question.content,
      authorId: question.authorId,
      linkId: question.linkId,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      isResolved: question.isResolved,
      answers: question.answers?.map(answer => new AnswerEntity({
        id: answer.id,
        content: answer.content,
        questionId: answer.questionId,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
        userId: answer.userId,
      })),
    });
  }

  async create(input: CreateQuestionGatewayDto): Promise<QuestionEntity> {
    const { authorId, linkId, content } = input;
    const createdQuestion = await this.questionRepository.create({
      data: {
        content,
        authorId,
        linkId,
      },
    });
    return this.toEntity(createdQuestion);
  }

  async findManyByLinkId(linkId: number): Promise<QuestionEntity[]> {
    const questions = await this.prisma.question.findMany({
      where: { linkId },
      include: { answers: true, link: true },
    });

    return questions.map(question => this.toEntity(question));
  }

  async findByIdOrNull(id: number): Promise<QuestionEntity | null> {
    const question = await this.questionRepository.findUnique({
      where: { id },
      include: { link: true },
    });

    if (!question) {
      return null;
    }

    return this.toEntity(question);
  }

  async findManyWithAnswersByLinkId(linkId: number): Promise<QuestionEntity[]> {
    const questions = await this.questionRepository.findMany({
      where: { linkId },
      include: {
        answers: true,
      },
    });

    return questions.map((question) => {
      return this.toEntity(question);
    });
  }
}
