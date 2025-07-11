import { Router } from "express";
import {
  getUsers,
  getProfile,
  updateUserRole,
} from "../controllers/user.controller";
import { protect } from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";

const router = Router();

router.use(protect);

router.get("/profile", getProfile);

router.get("/", authorizeRoles("admin"), getUsers);
router.put("/:id/role", authorizeRoles("admin"), updateUserRole);

export default router;
