import express, { Request, Response, NextFunction } from "express";
import { body, param, query, validationResult } from "express-validator";
import { validationErrorHandler } from "../errorHandlers/validationErrorHandler";
import { HotelController } from "../controllers";
import authenticationMiddleware from "../middleware/authentication";
import authorizationMiddleware from "../middleware/authorization";

const router = express.Router();

const hotelController = new HotelController();

router.post(
  "/",
  authenticationMiddleware,
  authorizationMiddleware,
  [
    body("name").trim().isLength({ min: 1 }).withMessage("Name is required"),
    body("country")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Country is required"),
    body("city").trim().isLength({ min: 1 }).withMessage("City is required"),
    body("address")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Address is required"),
    body("latitude")
      .isFloat({ min: -90, max: 90 })
      .withMessage("Latitude must be between -90 and 90"),
    body("longitude")
      .isFloat({ min: -180, max: 180 })
      .withMessage("Longitude must be between -180 and 180"),
    body("description")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Description is required"),
    body("rating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    body("is_available")
      .optional()
      .isBoolean()
      .withMessage("is_available must be a boolean"),
    body("images").optional().isArray().withMessage("Images must be an array"),
  ],
  validationErrorHandler,
  hotelController.createHotel
);

router.get(
  "/",
  authenticationMiddleware,
  authorizationMiddleware,
  [
    query("country")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage("Country filter must be non-empty"),
    query("city")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage("City filter must be non-empty"),
    query("is_available")
      .optional()
      .isBoolean()
      .withMessage("is_available filter must be a boolean"),
    query("min_rating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Minimum rating must be between 0 and 5"),
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer"),
    query("limit")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Limit must be a positive integer"),
  ],
  validationErrorHandler,
  hotelController.getHotels
);

router.get(
  "/:id",
  authenticationMiddleware,
  authorizationMiddleware,
  [
    param("id")
      .isInt({ min: 1 })
      .withMessage("Hotel ID must be a positive integer"),
  ],
  validationErrorHandler,
  hotelController.getHotelById
);

router.put(
  "/:id",
  authenticationMiddleware,
  authorizationMiddleware,
  [
    param("id")
      .isInt({ min: 1 })
      .withMessage("Hotel ID must be a positive integer"),
    body("name")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage("Name must be non-empty"),
    body("country")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage("Country must be non-empty"),
    body("city")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage("City must be non-empty"),
    body("address")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage("Address must be non-empty"),
    body("latitude")
      .optional()
      .isFloat({ min: -90, max: 90 })
      .withMessage("Latitude must be between -90 and 90"),
    body("longitude")
      .optional()
      .isFloat({ min: -180, max: 180 })
      .withMessage("Longitude must be between -180 and 180"),
    body("description")
      .optional()
      .trim()
      .isLength({ min: 1 })
      .withMessage("Description must be non-empty"),
    body("rating")
      .optional()
      .isFloat({ min: 0, max: 5 })
      .withMessage("Rating must be between 0 and 5"),
    body("is_available")
      .optional()
      .isBoolean()
      .withMessage("is_available must be a boolean"),
    body("images").optional().isArray().withMessage("Images must be an array"),
  ],
  validationErrorHandler,
  hotelController.updateHotel
);

router.delete(
  "/:id",
  authenticationMiddleware,
  authorizationMiddleware,
  [
    param("id")
      .isInt({ min: 1 })
      .withMessage("Hotel ID must be a positive integer"),
  ],
  validationErrorHandler,
  hotelController.deleteHotel
);

export default router;
