import * as yup from "yup";

class RecipeDetailShape {
  purchaseDetailCreator = yup.object().shape({
    ingredientName: yup.string().required(),
    ingredientQty: yup.number().required(),
    measurementUnit: yup.string().required(),
  });
}

export default new RecipeDetailShape();
