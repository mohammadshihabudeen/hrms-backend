import { DataSource } from "typeorm";
import { Auth } from "./entities/Auth";
import { Users } from "./entities/Users";
import { JobTitles } from "./entities/JobTitles";
import { Locations } from "./entities/Locations";
import { MaritalStatuses } from "./entities/MaritalStatuses";
import { Countries } from "./entities/Countries";
import { Departments } from "./entities/Departments";
import { JobRoles } from "./entities/JobRoles";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "aws-0-ap-south-1.pooler.supabase.com",
  port: 6543,
  username: "postgres.odsnxocpckdzwrmwveeo",
  password: "Shihabudeen1234*",
  database: "postgres",
  synchronize: true,
  logging: true,
  entities: [
    Auth,
    Users,
    JobTitles,
    Locations,
    MaritalStatuses,
    Countries,
    Departments,
    JobRoles,
  ],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
});
