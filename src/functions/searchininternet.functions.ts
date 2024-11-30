import { tavily } from "@tavily/core";
import { config } from "dotenv";
config();

const { API_KEY_TAVILY } = process.env;

export type search = "basic" | "advanced";

export async function searchInInternet(
  message: string,
  searchDepth: search
): Promise<string> {
  const tvly = tavily({ apiKey: API_KEY_TAVILY });

  const context: string = await tvly.searchContext(message, {
    searchDepth,
  });

  return context;
}
