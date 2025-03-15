export interface Answer {
  id: number;
  createdAt: Date;
  updatedAt: Date;

  content: string;
  questionId: number;
  userId: number;
}
