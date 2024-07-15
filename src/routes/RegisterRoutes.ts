import { Router } from "express";
import { DataSource } from "typeorm";
import { registerHandler } from "../controllers/RegisterController";

export const registerRoutes = (dataSource: DataSource) => {
  const router = Router();
  router.post("/", registerHandler(dataSource));
  return router;
};
