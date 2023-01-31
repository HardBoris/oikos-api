import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ingredient } from "./Ingredients";
import { Purchase } from "./Purchase";

@Entity("purchase_details")
export class PurchaseDetail {
  @PrimaryGeneratedColumn("uuid")
  purchaseDetailId?: string;

  @Column()
  ingredientQty: number;

  @Column()
  ingredientPrice: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchaseDetails)
  @JoinColumn({ name: "purchaseId" })
  purchase: Purchase;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.purchaseDetails)
  @JoinColumn({ name: "ingredientId" })
  ingredient: Ingredient;
}
