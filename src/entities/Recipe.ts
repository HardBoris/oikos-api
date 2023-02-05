import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { RecipeDetail } from "./RecipeDetail";

@Entity("recipes")
export class Recipe {
  @PrimaryGeneratedColumn("uuid")
  recipeId?: string;

  @Column()
  recipeName: string;

  @OneToMany(() => RecipeDetail, (recipeDetail) => recipeDetail.recipe)
  recipeDetails: RecipeDetail[];
}
