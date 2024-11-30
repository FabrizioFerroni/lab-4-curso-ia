import Groq from "groq-sdk";
import {
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletionMessageParam,
} from "groq-sdk/resources/chat/completions";
import { ChatCompletionDto } from "../dto/completion.dto";
import { config } from "dotenv";
config();

const { API_KEY_GROQ } = process.env;

export class GroqService {
  private chatHistory: ChatCompletionMessageParam[] = [];

  groq = new Groq({ apiKey: API_KEY_GROQ });

  async chatCompletions(dto: ChatCompletionDto): Promise<string> {
    const { model, message } = dto;

    this.chatHistory.push({
      role: "user",
      content: message,
    });

    const body: ChatCompletionCreateParamsNonStreaming = {
      messages: this.chatHistory,
      model: model,
    };

    const chatCompletion = await this.groq.chat.completions.create(body);

    const aiResponse =
      chatCompletion.choices[0].message.content || "No hubo respuesta";

    this.chatHistory.push({
      role: "assistant",
      content: aiResponse,
    });

    return aiResponse;
  }

  async reflexion(dto: ChatCompletionDto): Promise<string> {
    const { model, message } = dto;

    this.chatHistory.push({
      role: "assistant",
      content: message,
    });

    const body: ChatCompletionCreateParamsNonStreaming = {
      messages: this.chatHistory,
      model: model,
    };

    const chatCompletion = await this.groq.chat.completions.create(body);

    const aiResponse =
      chatCompletion.choices[0].message.content || "No hubo respuesta";

    return aiResponse;
  }
}
