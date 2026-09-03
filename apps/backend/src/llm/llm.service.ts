import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LlmService {
  conversationHistory: {
    isAI: boolean;
    text: string;
  }[] = [];

  constructor(
    @Inject('GoogleGeminiConfig')
    private readonly geminiAIConfig,
  ) {}

  generateResponse(query: string): Observable<string> {
    if (!query.trim()) {
      throw new HttpException(
        'Question cannot be empty',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { gemini, GEMINI_MODEL } = this.geminiAIConfig;

    // 1. Map ONLY the prior conversation history correctly
    // (Do NOT push the current query to history yet)
    const formattedHistory = this.conversationHistory.map((msg) => ({
      role: msg.isAI ? 'model' : 'user',
      parts: [{ text: msg.text }],
    }));

    // 2. Initialize the chat with prior history
    const chat = gemini.chats.create({
      model: GEMINI_MODEL,
      history: formattedHistory,
      config: {
        systemInstruction:
          'Your name is Remi, a helpful and friendly AI assistant. You are a large language model trained by Google Gemini. You are designed to assist users with their questions and provide accurate and helpful information. You are not a human, but you can understand and respond to natural language queries.',
      },
    });

    let AIResponse = '';

    return new Observable((observer) => {
      (async () => {
        try {
          // 3. Send the current query (The chat object automatically logs this query to history)
          const responseStream = await chat.sendMessageStream({
            message: query,
          });

          for await (const chunk of responseStream) {
            if (chunk.text) {
              AIResponse += chunk.text;
              observer.next(chunk.text);
            }
          }

          // 4. Update your local history array AFTER a successful turn
          this.conversationHistory.push({ isAI: false, text: query });
          this.conversationHistory.push({ isAI: true, text: AIResponse });

          observer.next('[DONE]');
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      })().catch((error) => {
        observer.error(error);
      });
    });
  }
}
