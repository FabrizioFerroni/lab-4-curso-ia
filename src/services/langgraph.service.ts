import { config } from "dotenv";
import { AIMessageChunk, HumanMessage } from "@langchain/core/messages";
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { ChatGroq } from "@langchain/groq";
import { searchInInternet } from "../functions/searchininternet.functions";

config();

const { API_KEY_GROQ } = process.env;

export class LangGraph {
  shouldContinue({ messages }: typeof MessagesAnnotation.State) {
    const lastMessage = messages[messages.length - 1];

    if (lastMessage.additional_kwargs.tool_calls) {
      return "tools";
    }

    return "__end__";
  }

  async callModel(state: typeof MessagesAnnotation.State) {
    const model: ChatGroq = new ChatGroq({
      model: "llama-3.1-70b-versatile",
      temperature: 0,
      maxTokens: undefined,
      maxRetries: 2,
      apiKey: API_KEY_GROQ,
    });

    const response: AIMessageChunk = await model.invoke(state.messages);

    return { messages: [response] };
  }

  async searchInInternetLG(msg: string): Promise<string> {
    const response = await searchInInternet(msg, "basic");
    return response;
  }

  workflow = new StateGraph(MessagesAnnotation)
    .addNode("agent", this.callModel)
    .addEdge("__start__", "agent")
    .addNode("tools", this.searchInInternetLG)
    .addEdge("tools", "agent")
    .addConditionalEdges("agent", this.shouldContinue);

  async createNode(msg: string): Promise<{
    finalState: string;
    nextState: string;
  }> {
    const app = this.workflow.compile();

    const finalState = await app.invoke({
      messages: [new HumanMessage(msg)],
    });

    console.log(finalState.messages[finalState.messages.length - 1].content);

    const nextState = await app.invoke({
      messages: [...finalState.messages, new HumanMessage(msg)],
    });

    return {
      finalState: finalState.messages[finalState.messages.length - 1].content,
      nextState: nextState.messages[nextState.messages.length - 1].content,
    };
  }
}
