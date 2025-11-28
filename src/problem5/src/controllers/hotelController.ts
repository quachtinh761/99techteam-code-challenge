import express, { Request, Response, NextFunction } from "express";
import { Hotel, Room } from "../models";
import { Op } from "sequelize";

export class HotelController {
  async createHotel(req: Request, res: Response) {
    try {
      // const hotel = await Hotel.create(req.body);
      res.status(201).json({
        success: true,
        message: "Hotel created successfully",
        // data: hotel,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error creating hotel",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getHotels(req: Request, res: Response) {
    try {
      const {
        country,
        city,
        is_available,
        min_rating,
        page = 1,
        limit = 10,
      } = req.query;
      const where: any = {};

      if (country) {
        where.country = country;
      }
      if (city) {
        where.city = city;
      }
      if (is_available !== undefined) {
        where.is_available = is_available === "true";
      }
      if (min_rating) {
        where.rating = { [Op.gte]: parseFloat(min_rating as string) };
      }

      const hotels = await Hotel.findAll({
        where,
        limit: parseInt(limit as string, 10),
        offset:
          (parseInt(page as string, 10) - 1) * parseInt(limit as string, 10),
        include: [
          {
            model: Room,
            as: "rooms",
            attributes: ["id", "name", "type", "price", "is_available"],
          },
        ],
      });

      res.json({
        success: true,
        message: "Hotels retrieved successfully",
        data: hotels,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching hotels",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async getHotelById(req: Request, res: Response) {
    try {
      const hotel = await Hotel.findByPk(req.params.id, {
        include: [
          {
            model: Room,
            as: "rooms",
          },
        ],
      });

      if (!hotel) {
        return res.status(404).json({
          success: false,
          message: "Hotel not found",
        });
      }

      res.json({
        success: true,
        message: "Hotel retrieved successfully",
        data: hotel,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error fetching hotel",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async updateHotel(req: Request, res: Response) {
    try {
      const hotel = await Hotel.findByPk(req.params.id);
      if (!hotel) {
        return res.status(404).json({
          success: false,
          message: "Hotel not found",
        });
      }

      await hotel.update(req.body);

      res.json({
        success: true,
        message: "Hotel updated successfully",
        data: hotel,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error updating hotel",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  async deleteHotel(req: Request, res: Response) {
    try {
      const hotel = await Hotel.findByPk(req.params.id);
      if (!hotel) {
        return res.status(404).json({
          success: false,
          message: "Hotel not found",
        });
      }

      await hotel.destroy();

      res.json({
        success: true,
        message: "Hotel deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error deleting hotel",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}
