import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PurchaseDetail } from "./PurchaseDetails";

@Entity("ingredients")
export class Ingredient {
  @PrimaryGeneratedColumn("uuid")
  ingredientId?: string;

  @Column()
  ingredientName: string;

  @Column()
  measurementUnit: string;

  @OneToMany(
    () => PurchaseDetail,
    (purchaseDetail) => purchaseDetail.ingredient
  )
  purchaseDetails: PurchaseDetail[];
}
