import { Request, Response, NextFunction } from "express";
import { AuthenticationRequest } from "../types/authenticationRequest";

export default function authenticationMiddleware(
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
) {
  let apiKey = req.headers["authorization"];

  if (
    apiKey &&
    apiKey.startsWith("Bearer ") &&
    ["admin-key", "user-key"].includes(apiKey.replace("Bearer ", ""))
  ) {
    apiKey = apiKey.replace("Bearer ", "");

    if (apiKey === "admin-key") {
      req.user = {
        id: 1,
        email: "tino1@example.com",
        name: "Tino One",
        role: {
          name: "admin",
          permissions: {
            hotels: ["create", "read", "update", "delete"],
            rooms: ["create", "read", "update", "delete"],
          },
        },
      };
    } else if (apiKey === "user-key") {
      req.user = {
        id: 2,
        email: "tino2@example.com",
        name: "Tino Two",
        role: {
          name: "user",
          permissions: {
            hotels: ["read"],
            rooms: ["read"],
          },
        },
      };
    }

    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or missing API key",
    });
  }
}
