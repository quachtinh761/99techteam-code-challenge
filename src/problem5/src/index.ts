import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import sequelize from "./database";
import hotelRoutes from "./routes/hotels";
import { generalErrorHandler, notFoundErrorHandler } from "./errorHandlers";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/hotels", hotelRoutes);

app.get("/health", (req: Request, res: Response): void => {
  res.json({
    success: true,
    message: "Hotel Management API is running",
    timestamp: new Date().toISOString(),
  });
});

app.use("*", notFoundErrorHandler);

app.use(generalErrorHandler);

app.use(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await sequelize.close();
    console.log("Database connection closed.");
    next();
  } catch (error) {
    next(error);
  }
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    await sequelize.sync({ force: false });
    console.log("Database synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`API Base URL: http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();
