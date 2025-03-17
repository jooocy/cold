import { Injectable } from "@nestjs/common";
import { OpenAI } from "openai";

@Injectable()
export class OpenAiService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generateText(prompt: string): Promise<string | null> {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
  }

  async generateQuestion(): Promise<string | null> {
    const randomQuestion = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "가족에 대한 질문을 하나 생성해줘" }],
    });

    return randomQuestion.choices[0].message.content;
  }
}