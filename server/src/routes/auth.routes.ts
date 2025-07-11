import express from "express";
import { signup, login } from "../controllers/auth.controller";
import { validateRequest } from "../middleware/validation.middleware";
import { signupSchema, loginSchema } from "../utils/validationSchemas";

const router = express.Router();

router.post("/signup", validateRequest(signupSchema), signup);
router.post("/login", validateRequest(loginSchema), login);

export default router;
