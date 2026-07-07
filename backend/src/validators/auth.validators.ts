import { body } from "express-validator";

export const registerValidator = [
  body("email").isEmail().withMessage("A valid email is required"),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),
  body("name").trim().notEmpty().withMessage("Name is required"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("A valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];
