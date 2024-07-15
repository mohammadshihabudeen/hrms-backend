import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class JobRoles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Role: string;

  @Column({ default: "shihabudeen" })
  createdBy: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;
}
