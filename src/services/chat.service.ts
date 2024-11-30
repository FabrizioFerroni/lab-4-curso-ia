import { GroqService } from "./groq.service";
import { LangGraph } from "./langgraph.service";

export class ChatService {
  groqService: GroqService = new GroqService();
  lgService: LangGraph = new LangGraph();
  model: string = "llama-3.1-70b-versatile";

  // Paso 1: buscar el mensaje que busca el usuario en la IA
  async searchInIa(msg: string): Promise<string> {
    const response = await this.groqService.chatCompletions({
      model: this.model,
      message: msg,
    });

    return response;
  }

  // Paso 2: buscar con el mismo mensaje en internet
  async searchInGraphAndInternet(msg: string): Promise<string> {
    const { nextState } = await this.lgService.createNode(msg);
    return nextState;
  }

  // Paso 3: juntar la respuestas de paso 1 y 2 para pasarle a la ia para que reflexione.
  async reflexionIA(rspIa: string, rspInt: string): Promise<string> {
    return "hola";
  }

  // Paso 4: devolver la respuesta final al usuario
  async responseUser(msg: string): Promise<string> {
    const searchInIa = await this.searchInIa(msg);
    const searchInInternet = await this.searchInGraphAndInternet(msg);
    const reflexIa = await this.reflexionIA(searchInIa, searchInInternet);
    return reflexIa;
  }
}
