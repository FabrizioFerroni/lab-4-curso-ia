import { Request, Response } from "express";
import { ChatCompletionDto } from "../dto/completion.dto";
import { GroqService } from "../services/groq.service";

const groqService = new GroqService();
const model = "llama-3.1-70b-versatile";

export async function postChat(req: Request, res: Response) {
  try {
    const { message } = req.body;

    const dto: ChatCompletionDto = {
      model,
      message,
    };

    const response: string = await groqService.chatCompletions(dto);

    res.status(200).json({
      response,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
