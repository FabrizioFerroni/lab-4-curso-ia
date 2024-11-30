import { Request, Response } from "express";
import { LangGraph } from "../services/langgraph.service";
import { searchInInternet } from "../functions/searchininternet.functions";

const lgService = new LangGraph();
const model = "llama-3.1-70b-versatile";

export async function getNodes(req: Request, res: Response) {
  try {
    const response: {
      finalState: string;
      nextState: string;
    } = await lgService.createNode("HOla");

    res.status(200).json({
      response,
    });
  } catch (error: any) {
    // console.error(error);

    res.status(500).json({ message: error.message });
  }
}

export async function testSearch(req: Request, res: Response) {
  try {
    const { message } = req.body;
    const response = await searchInInternet(message, "basic");

    res.status(200).json({
      response,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
