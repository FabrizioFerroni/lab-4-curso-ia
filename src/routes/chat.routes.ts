import { Router } from "express";
import { postChat } from "../controller/groq.controller";
import { chatIaInternet } from "../controller/chat.controller";

const router = Router();

router.post("/chats", chatIaInternet);

export default router;
