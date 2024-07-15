import { DataSource } from "typeorm";
import { AuthRepository } from "../repositories/AuthRepository";
import { Users } from "../entities/Users";
import { Auth } from "../entities/Auth";
import bcrypt from "bcrypt";

export class AuthService {
  private authRepository: AuthRepository;

  constructor(dataSource: DataSource) {
    this.authRepository = new AuthRepository(dataSource);
  }

  async register(user: Users, password: string): Promise<Auth> {
    // Check if user is already registered in Auth table
    const existingAuth = await this.authRepository.findByEmail(user.email);
    if (existingAuth) {
      throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const auth = new Auth();
    auth.user = user;
    auth.password = hashedPassword;
    return await this.authRepository.save(auth);
  }

  async login(email: string, password: string): Promise<boolean> {
    const auth = await this.authRepository.findByEmail(email);
    if (!auth) return false;
    return await bcrypt.compare(password, auth.password);
  }

  async findByEmail(email: string): Promise<Auth | null> {
    return await this.authRepository.findByEmail(email);
  }
}
