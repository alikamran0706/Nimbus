import express from "express";
import {
  getCompanies, createCompany, getCompany, updateCompany, deleteCompany,
} from "../controllers/company.controller.js";
import { verifyAuth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/role.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, getCompanies)
  .post(verifyAuth, allowRoles("admin"), createCompany);

router
  .route("/:id")
  .get(verifyAuth, getCompany)
  .put(verifyAuth, allowRoles("admin"), updateCompany)
  .delete(verifyAuth, allowRoles("admin"), deleteCompany);

export default router;
