import { Module } from '@nestjs/common';
import { LlmService } from './llm.service';
import { LlmController } from './llm.controller';
import { GoogleGeminiConfig } from 'src/config/gemini.config';

@Module({
  providers: [LlmService, GoogleGeminiConfig],
  controllers: [LlmController],
})
export class LlmModule {}
