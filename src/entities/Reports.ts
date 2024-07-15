import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Reports {
  @PrimaryGeneratedColumn()
  reportId: number;

  @Column()
  reportName: string;

  @Column()
  issuedDate: Date;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user: Users;

  @Column()
  uploadedDate: Date;

  @Column()
  reportType: string;

  @Column({ default: "shihabudeen" })
  createdBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;
}
