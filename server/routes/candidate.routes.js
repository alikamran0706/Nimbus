import express from "express";
import {
  getCandidates, createCandidate, getCandidate, updateCandidate, deleteCandidate,
} from "../controllers/candidate.controller.js";
import { verifyAuth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/role.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getCandidates)
  .post(verifyAuth, allowRoles("admin", "recruiter"), createCandidate);

router
  .route("/:id")
  .get(verifyAuth, getCandidate)
  .put(verifyAuth, allowRoles("admin", "recruiter"), updateCandidate)
  .delete(verifyAuth, allowRoles("admin"), deleteCandidate);

export default router;
