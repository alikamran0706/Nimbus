import express from "express";
import {getMessages, createMessage} from "../controllers/message.controller.js";
import { verifyAuth } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getMessages)
  .post(verifyAuth, createMessage);

export default router;
