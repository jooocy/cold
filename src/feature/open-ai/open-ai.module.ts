import { OpenAiController } from "./open-ai.controller";
import { OpenAiService } from "./open-ai.service";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [OpenAiController],
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
