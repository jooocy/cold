import { Question } from "../../domain/model/interface/question.interface";

export interface CreateQuestionUsecase {
  execute(linkId: number, userId: number): Promise<Question>;
}

export const CreateQuestionUsecase = Symbol('CreateQuestionUsecase');
