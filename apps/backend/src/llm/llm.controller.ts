import { Controller, Get, Query, Sse } from '@nestjs/common';
import { LlmService } from './llm.service';

@Controller('llm')
export class LlmController {
  constructor(private readonly llmService: LlmService) {}

  @Get('ask')
  @Sse()
  async askQuestion(@Query('query') query: string) {
    return this.llmService.generateResponse(query);
  }
}
