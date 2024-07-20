import { Request, Response } from "express";
import { DataSource } from "typeorm";
import { AppDataSource } from "../data-source";
import { Users } from "../entities/Users";
import { AuthRepository } from "../repositories/AuthRepository";
import { AuthService } from "../services/AuthService";
import { sendRegistrationEmail } from "../services/mailService";
import { generateRandomPassword } from "../utils/passwordGenerator";

export const registerHandler = (dataSource: DataSource) => {
  const authService = new AuthService(dataSource);

  return async (req: Request, res: Response) => {
    const { employeeId, password } = req.body;

    if (!employeeId || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Check if user exists in Users table
      const user = await dataSource
        .getRepository(Users)
        .findOneBy({ employeeId });
      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      // Register the user in the Auth table
      const newAuth = await authService.register(user, password);
      return res
        .status(201)
        .json({ message: `User ${user.employeeId} registered successfully` });
    } catch (err: any) {
      // Handle case where user is already registered
      if (err.message === "User already registered") {
        return res.status(400).json({ message: err.message });
      }
      return res.status(500).json({ message: err.message });
    }
  };
};

const EmailHandler = (dataSource: DataSource) => {
  const authService = new AuthService(dataSource);

  return async (req: Request, res: Response) => {
    if (req.method !== "POST") {
      res.status(405).json({ message: "Method not allowed" });
      return;
    }

    const { email, employeeName, employeeId } = req.body;

    if (!email || !employeeName || !employeeId) {
      res
        .status(400)
        .json({ message: "Email, employeeName and EmployeeId are required" });
      return;
    }

    try {
      const userRepository = AppDataSource.getRepository(Users);
      const user = await userRepository.findOne({ where: { employeeId } });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const password = generateRandomPassword();
      await authService.register(user, password);
      await sendRegistrationEmail(email, employeeName, password, employeeId);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};

export default EmailHandler;

export const checkRegistrationEmailHandler = (dataSource: DataSource) => {
  return async (req: Request, res: Response) => {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    try {
      const authRepository = new AuthRepository(dataSource);
      const auth = await authRepository.findByEmail(email as string);
      const isRegistered = !!auth; // Convert to boolean

      res.status(200).json({ registered: isRegistered });
    } catch (error) {
      console.error("Error checking registration status", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};

export const checkRegistrationEmployeeIdHandler = (dataSource: DataSource) => {
  return async (req: Request, res: Response) => {
    const { employeeId } = req.query;
    if (!employeeId) {
      return res.status(400).json({ message: "EmployeeId is required" });
    }

    try {
      const authRepository = new AuthRepository(dataSource);
      const auth = await authRepository.findByEmployeeId(employeeId as string);
      const isRegistered = !!auth; // Convert to boolean

      res.status(200).json({ registered: isRegistered });
    } catch (error) {
      console.error("Error checking registration status", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};
