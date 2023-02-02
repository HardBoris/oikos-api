import { PurchaseDetail } from "./PurchaseDetails";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@Entity("purchase")
export class Purchase {
  @PrimaryGeneratedColumn("uuid")
  purchaseId?: string;

  @CreateDateColumn()
  purchaseDate?: Date;

  @Column({ type: "float", default: 0.0 })
  purchaseTotal?: number;

  @ManyToOne(() => User, (user) => user.purchases)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(
    () => PurchaseDetail,
    (purchaseDetail) => purchaseDetail.purchase,
    { eager: true }
  )
  purchaseDetails: PurchaseDetail[];
}
