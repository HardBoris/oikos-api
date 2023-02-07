import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("ingredients")
export class Ingredient {
  @PrimaryGeneratedColumn("uuid")
  ingredientId?: string;

  @Column()
  ingredientName: string;

  @Column()
  measurementUnit: string;

  /* @OneToMany(
    () => PurchaseDetail,
    (purchaseDetail) => purchaseDetail.ingredient
  )
  purchaseDetails: PurchaseDetail[]; */

  /* @OneToMany(() => RecipeDetail, (recipeDetail) => recipeDetail.ingredient)
  recipeDetails: RecipeDetail[]; */
}
