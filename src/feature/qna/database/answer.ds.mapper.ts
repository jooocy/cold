import { Injectable } from "@nestjs/common";
import { AnswerGateway } from "../domain/gateway/answer.gateway";
import { AnswerEntity } from "../domain/model/answer.entity";
import { Answer, PrismaClient } from "@prisma/client";
import { PrismaService } from "src/core/db/prisma.service";

@Injectable()
export class AnswerDsMapper implements AnswerGateway {
  private readonly answerRepository: PrismaClient['answer'];

  constructor(private readonly prisma: PrismaService) {
    this.answerRepository = prisma.answer;
  }

  async findManyByQuestionId(questionId: number): Promise<AnswerEntity[]> {
    const answers = await this.answerRepository.findMany({
      where: {
        questionId: questionId,
      },
    });
    
    return answers.map((answer) => {
      return this.toEntity(answer);
    });
  }

  async findByIdOrNull(id: number): Promise<AnswerEntity | null> {
    const answer = await this.answerRepository.findUnique({
      where: {
        id: id,
      },
    });

    if (!answer) {
      return null;
    }

    return this.toEntity(answer);
  }

  private toEntity(answer: Answer): AnswerEntity {
    return new AnswerEntity({
      id: answer.id,
      content: answer.content,
      userId: answer.userId,
      questionId: answer.questionId,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt,
    });
  }
}