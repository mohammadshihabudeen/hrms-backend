import { Router } from "express";
import { DataSource } from "typeorm";
import EmailHandler, {
  checkRegistrationEmailHandler,
  checkRegistrationEmployeeIdHandler,
  registerHandler,
} from "../controllers/RegisterController";
export const registerRoutes = (dataSource: DataSource) => {
  const router = Router();
  router.post("/", registerHandler(dataSource));
  router.post("/mail", EmailHandler(dataSource));
  router.get("/check-mail", checkRegistrationEmailHandler(dataSource));
  router.get(
    "/check-employeeId",
    checkRegistrationEmployeeIdHandler(dataSource)
  );

  return router;
};
