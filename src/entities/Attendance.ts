import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  attendanceId: number;

  @Column()
  date: Date;

  @Column("json")
  checkIn: object;

  @Column("json")
  checkOut: object;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user: Users;

  @Column({ default: "shihabudeen" })
  createdBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;
}
