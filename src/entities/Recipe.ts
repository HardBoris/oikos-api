import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { RecipeDetail } from "./RecipeDetail";
import { User } from "./User";

@Entity("recipes")
export class Recipe {
  @PrimaryGeneratedColumn("uuid")
  recipeId?: string;

  @Column()
  recipeName: string;

  @ManyToOne(() => User, (user) => user.recipes)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(() => RecipeDetail, (recipeDetail) => recipeDetail.recipe, {
    eager: true,
  })
  recipeDetails: RecipeDetail[];
}
