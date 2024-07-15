import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class EmployeeLeave {
  @PrimaryGeneratedColumn()
  leaveId: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user: Users;

  @Column()
  fromDate: Date;

  @Column()
  toDate: Date;

  @Column()
  leaveType: string;

  @Column({ nullable: true })
  reason: string;

  @Column({ default: "shihabudeen" })
  createdBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;
}
