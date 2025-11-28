import { Request, Response } from "express";

export default function notFoundErrorHandler(
  req: Request,
  res: Response
): void {
  res.status(404).send({
    success: false,
    message: "Resource not found",
  });
}
