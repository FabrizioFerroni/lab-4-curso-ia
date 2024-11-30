import { Router } from "express";
import { postChat } from "../controller/groq.controller";

const router = Router();

router.post("/groq", postChat);

export default router;
