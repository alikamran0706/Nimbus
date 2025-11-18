import express from "express";
import { getApplications, createApplication, getApplication, updateApplication, deleteApplication, }
  from "../controllers/applications.controller.js";
import { verifyAuth } from "../middleware/auth.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getApplications)
  .post(verifyAuth, createApplication);

router
  .route("/:id")
  .get(verifyAuth, getApplication)
  .put(verifyAuth, updateApplication)
  .delete(verifyAuth, deleteApplication);

export default router;
