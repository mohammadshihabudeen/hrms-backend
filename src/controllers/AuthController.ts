import { Request, Response } from "express";
import { DataSource } from "typeorm";
import { AuthService } from "../services/AuthService";
import { Users } from "../entities/Users";
import { AppDataSource } from "../data-source";

export const authHandler = (dataSource: DataSource) => {
  const authService = new AuthService(dataSource);

  return async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      const isAuthenticated = await authService.login(email, password);
      if (isAuthenticated) {
        const userRepository = AppDataSource.getRepository(Users);
        const user = await userRepository.findOne({
          where: { email: email },
          relations: ["jobRole"],
        });
        return res.json({
          id: user?.email,
          name: user?.employeeName,
          role: user?.jobRole.Role,
          image: user?.profile || "",
        });
      } else {
        return res.status(401).json({ message: "Invalid email or password" });
      }
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };
};
