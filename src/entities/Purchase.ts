import { networkInterfaces } from "os";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn("uuid")
  purchaseId?: string;

  @CreateDateColumn()
  purchaseDate?: Date;

  @Column({ default: 0 })
  purchaseTotal?: number;

  @ManyToOne(() => User, (user) => user.purchases)
  @JoinColumn({ name: "userId" })
  user: User;
}
