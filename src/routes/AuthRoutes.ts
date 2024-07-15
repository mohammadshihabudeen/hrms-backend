import { Router } from "express";
import { DataSource } from "typeorm";
import { authHandler } from "../controllers/AuthController";

export const authRoutes = (dataSource: DataSource) => {
  const router = Router();
  router.post("/", authHandler(dataSource));
  return router;
};
