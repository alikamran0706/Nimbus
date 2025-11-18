import express from "express";
import {getCallTranscripts, createTranscript} from "../controllers/callTranscript.controller.js";
import { verifyAuth } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getCallTranscripts)
  .post(verifyAuth, createTranscript);

export default router;
