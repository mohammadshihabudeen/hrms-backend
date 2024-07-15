import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getDefaults,
} from "../controllers/userController";

const usersRoutes = Router();

usersRoutes.get("/defaults", getDefaults);
usersRoutes.get("/", getUsers);
usersRoutes.get("/:id", getUser);
usersRoutes.post("/", createUser);
usersRoutes.put("/:id", updateUser);
usersRoutes.delete("/:id", deleteUser);

export default usersRoutes;
