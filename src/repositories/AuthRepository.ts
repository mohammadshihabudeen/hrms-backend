import { DataSource } from "typeorm";
import { Auth } from "../entities/Auth";
import { Users } from "../entities/Users";

export class AuthRepository {
  constructor(private dataSource: DataSource) {}

  async findByUserId(userId: number): Promise<Auth | null> {
    return await this.dataSource.getRepository(Auth).findOne({
      where: { user: { userId } },
      relations: ["user"],
    });
  }

  async findByEmployeeId(employeeId: string): Promise<Auth | null> {
    const user = await this.dataSource.getRepository(Users).findOne({
      where: { employeeId },
    });
    if (!user) return null;

    return await this.dataSource.getRepository(Auth).findOne({
      where: { user: { userId: user.userId } }, // Correctly query by userId
      relations: ["user"],
    });
  }
  async findByEmail(email: string): Promise<Auth | null> {
    const user = await this.dataSource.getRepository(Users).findOne({
      where: { email },
    });
    if (!user) return null;
    return await this.dataSource.getRepository(Auth).findOne({
      where: { user: { userId: user.userId } }, // Correctly query by userId
      relations: ["user"],
    });
  }
  async save(auth: Auth): Promise<Auth> {
    return await this.dataSource.getRepository(Auth).save(auth);
  }
}
