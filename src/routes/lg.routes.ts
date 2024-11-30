import { Router } from "express";
import { getNodes, testSearch } from "../controller/langgraph.controller";

const router = Router();

router.get("/langgraph", getNodes);
router.post("/search", testSearch);

export default router;
