import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Runs after a validator chain; returns 400 if any rule failed.
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
