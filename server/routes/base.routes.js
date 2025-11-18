import express from "express";
import controller from "../controllers/<name>.controller.js";
import { verifyAuth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/role.js";

const router = express.Router();

router
  .route("/")
  .get(verifyAuth, controller.getAll)
  .post(verifyAuth, allowRoles("admin", "recruiter"), controller.create);

router
  .route("/:id")
  .get(verifyAuth, controller.getOne)
  .put(verifyAuth, allowRoles("admin", "recruiter"), controller.update)
  .delete(verifyAuth, allowRoles("admin"), controller.remove);

router.post("/bulk/create", verifyAuth, allowRoles("admin"), controller.bulkCreate);
router.patch("/bulk/update", verifyAuth, allowRoles("admin"), controller.bulkUpdate);
router.delete("/bulk/delete", verifyAuth, allowRoles("admin"), controller.bulkDelete);

export default router;
