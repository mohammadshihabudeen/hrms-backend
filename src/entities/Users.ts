import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { JobTitles } from "./JobTitles";
import { MaritalStatuses } from "./MaritalStatuses";
import { Countries } from "./Countries";
import { Departments } from "./Departments";
import { Locations } from "./Locations";
import { JobRoles } from "./JobRoles";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  employeeName: string;

  @Column({ unique: true })
  employeeId: string;

  @Column()
  profile: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => JobTitles)
  @JoinColumn({ name: "jobTitle" })
  jobTitle: JobTitles;

  @ManyToOne(() => JobRoles)
  @JoinColumn({ name: "jobRole" })
  jobRole: JobRoles;

  @Column()
  salary: number;

  @Column()
  hireDate: string;

  @Column()
  contract: string;

  @ManyToOne(() => MaritalStatuses)
  @JoinColumn({ name: "maritalStatus" })
  maritalStatus: MaritalStatuses;

  @Column()
  degree: string;

  @ManyToOne(() => Countries)
  @JoinColumn({ name: "country" })
  country: Countries;

  @ManyToOne(() => Departments)
  @JoinColumn({ name: "department" })
  department: Departments;

  @ManyToOne(() => Locations)
  @JoinColumn({ name: "location" })
  location: Locations;

  @Column({ default: "system" })
  createdBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;

  @Column("bigint")
  phone: number;

  @Column()
  dob: string;
}
