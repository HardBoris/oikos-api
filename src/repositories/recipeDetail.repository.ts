import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { RecipeDetail } from "../entities";

interface IRecipeDetailRepo {
  save: (recipeDetail: RecipeDetail) => Promise<RecipeDetail>;
  all: () => Promise<RecipeDetail[]>;
  findOne: (payload: object) => Promise<RecipeDetail>;
}

class RecipeDetailRepo implements IRecipeDetailRepo {
  private ormRepo: Repository<RecipeDetail>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(RecipeDetail);
  }

  save = async (recipeDetail: Partial<RecipeDetail>) =>
    await this.ormRepo.save(recipeDetail);
  all = async () => await this.ormRepo.find();
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
}

export default new RecipeDetailRepo();
