import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Purchase } from "./Purchase";

@Entity("purchase_details")
export class PurchaseDetail {
  @PrimaryGeneratedColumn("uuid")
  purchaseDetailId?: string;

  @Column()
  ingredientName: string;

  @Column({ type: "float" })
  ingredientQty: number;

  @Column()
  measurementUnit: string;

  @Column({ type: "float" })
  ingredientPrice: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchaseDetails)
  @JoinColumn({ name: "purchaseId" })
  purchase: Purchase;
}
