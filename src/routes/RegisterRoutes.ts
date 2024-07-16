import { Router } from "express";
import { DataSource } from "typeorm";
import EmailHandler, { checkRegistrationStatusHandler, registerHandler } from "../controllers/RegisterController";
export const registerRoutes = (dataSource: DataSource) => {
  const router = Router();
  router.post("/", registerHandler(dataSource));
  router.post("/mail",EmailHandler(dataSource));
  router.get("/check", checkRegistrationStatusHandler(dataSource));
  return router;
};
