import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export function validationErrorHandler(
  req: Request,
  res: Response,
  next: NextFunction
): void | Response {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation errors",
      errors: errors.array(),
    });
  }

  next();
}
