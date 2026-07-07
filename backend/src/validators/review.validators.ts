import { body } from "express-validator";

export const reviewValidator = [
  body("courseId").isString().notEmpty().withMessage("courseId is required"),
  body("rating").isInt({ min: 1, max: 5 }).withMessage("Rating must be an integer 1-5"),
  body("text").trim().notEmpty().withMessage("Review text is required"),
];
