import * as yup from "yup";

class RecipeShape {
  recipeCreator = yup.object().shape({
    recipeName: yup.string().required(),
  });
}

export default new RecipeShape();
