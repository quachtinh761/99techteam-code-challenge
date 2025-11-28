import { Request, Response, NextFunction } from "express";

export default function generalErrorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error("URL: ", req.method, req.originalUrl);

  if (req.method === "POST" || req.method === "PUT") {
    console.error("Request Body: ", req.body);
  } else {
    console.error("Request Query: ", req.query);
    console.error("Request Params: ", req.params);
  }

  console.error("Error Message: ", error.message);
  console.error("Error Stack: ", error.stack);

  // TODO: Integrate with external logging service here if needed

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  });
}
