
import { Router } from "express";
import { chatsController } from "../controller/chats.controller.js";
import { authenticate } from "../utils/middlewares/auth.js";
  
const router = Router();

router.get("/messages", authenticate("jwt-auth"), chatsController.getMessages);

router.post("/message-add", authenticate("jwt-auth"), chatsController.addMessage);

export { router as chatsRouter };