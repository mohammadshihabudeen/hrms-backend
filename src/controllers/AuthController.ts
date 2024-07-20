import { Request, Response } from "express";
import { DataSource } from "typeorm";
import { AuthService } from "../services/AuthService";
import { Users } from "../entities/Users";
import { AppDataSource } from "../data-source";

export const authHandler = (dataSource: DataSource) => {
  const authService = new AuthService(dataSource);

  return async (req: Request, res: Response) => {
    const { employeeId, password } = req.body;

    if (!employeeId || !password) {
      return res
        .status(400)
        .json({ message: "EmployeeId and password are required" });
    }

    try {
      const isAuthenticated = await authService.login(employeeId, password);
      if (isAuthenticated) {
        const userRepository = AppDataSource.getRepository(Users);
        const user = await userRepository.findOne({
          where: { employeeId: employeeId },
          relations: ["jobRole"],
        });
        return res.json({
          id: user?.employeeId,
          name: user?.employeeName,
          role: user?.jobRole.Role,
          image: user?.profile || "",
        });
      } else {
        return res
          .status(401)
          .json({ message: "Invalid employeeId or password" });
      }
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  };
};
