import { Router } from "express";
import { verifyToken } from "../utils/token.js";
import { chatCompletionValidator, validate } from "../utils/vaidators.js";
import { generateChatCompletion } from "../controllers/chat-controllers.js";

const chatRouter = Router();
chatRouter.post("/new", validate(chatCompletionValidator), verifyToken, generateChatCompletion);

export default chatRouter;