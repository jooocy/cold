import { Controller, Post, Body } from "@nestjs/common";
import { OpenAiService } from "./open-ai.service";

@Controller('openai')
export class OpenAiController {
  constructor(private readonly openAiService: OpenAiService) {}

  @Post('generate-text')
  async generateText(@Body() body: { prompt: string }) {
    return this.openAiService.generateText(body.prompt);
  }
}
