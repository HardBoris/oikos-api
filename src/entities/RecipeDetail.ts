import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Ingredient } from "./Ingredients";
import { Purchase } from "./Purchase";
import { Recipe } from "./Recipe";

@Entity("recipe_details")
export class RecipeDetail {
  @PrimaryGeneratedColumn("uuid")
  recipeDetailId?: string;

  @Column()
  ingredientName: string;

  @Column("float")
  ingredientQty: number;

  @Column()
  measurementUnit: string;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeDetails)
  @JoinColumn({ name: "recipeId" })
  ingredient: Ingredient;

  @ManyToOne(() => Recipe, (recipe) => recipe.recipeDetails)
  @JoinColumn({ name: "recipeId" })
  recipe: Recipe;
}
