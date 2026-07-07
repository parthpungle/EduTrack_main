import { Router } from "express";
import { listCourses, searchCourses } from "../controllers/courses.controller";

const router = Router();

router.get("/", listCourses);
router.get("/search", searchCourses);

export default router;
