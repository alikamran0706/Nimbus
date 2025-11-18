import express from "express";
import { getInterviews, createInterview, getInterview, updateInterview, deleteInterview,
} from "../controllers/interview.controller.js";
import { verifyAuth } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getInterviews)
  .post(verifyAuth, createInterview);

router
  .route("/:id")
  .get(verifyAuth, getInterview)
  .put(verifyAuth, updateInterview)
  .delete(verifyAuth, deleteInterview);

export default router;
