import { Request, Response } from "express";
import { DataSource } from "typeorm";
import { AuthService } from "../services/AuthService";
import { Users } from "../entities/Users";

export const registerHandler = (dataSource: DataSource) => {
  const authService = new AuthService(dataSource);

  return async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Check if user exists in Users table
      const user = await dataSource.getRepository(Users).findOneBy({ email });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      // Register the user in the Auth table
      const newAuth = await authService.register(user, password);
      return res
        .status(201)
        .json({ message: `User ${user.email} registered successfully` });
    } catch (err: any) {
      // Handle case where user is already registered
      if (err.message === "User already registered") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: err.message });
    }
  };
};
