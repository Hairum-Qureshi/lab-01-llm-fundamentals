import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

export const GoogleGeminiConfig = {
  provide: 'GoogleGeminiConfig',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const GEMINI_MODEL = 'gemini-3.8-flash';
    const GEMINI_API_KEY = configService.get<string>('GEMINI_API_KEY');

    if (!GEMINI_API_KEY) {
      throw new Error(
        'Google Gemini API key is not defined in environment variables',
      );
    }

    const gemini = new GoogleGenAI({
      apiKey: GEMINI_API_KEY,
    });

    return {
      gemini,
      GEMINI_MODEL,
    };
  },
};
