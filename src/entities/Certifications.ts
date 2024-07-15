import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class Certifications {
  @PrimaryGeneratedColumn()
  certificationId: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  user: Users;

  @Column()
  certificationName: string;

  @Column()
  uploadedDate: Date;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  documentUrl: string;

  @Column()
  providerName: string;

  @Column({ default: "shihabudeen" })
  createdBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;
}
