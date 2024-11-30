import { Request, Response } from "express";
import { ChatService } from "../services/chat.service";

const chatService = new ChatService();

export async function chatIaInternet(req: Request, res: Response) {
  try {
    const { message } = req.body;

    const response: string = await chatService.responseUser(message);

    res.status(200).json({
      response,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
