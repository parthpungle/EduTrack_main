import { Router } from "express";
import { submitReview } from "../controllers/reviews.controller";
import { reviewValidator } from "../validators/review.validators";
import { validate } from "../middleware/validate";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.post("/", requireAuth, reviewValidator, validate, submitReview);

export default router;
