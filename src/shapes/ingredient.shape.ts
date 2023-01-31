import * as yup from "yup";

class IngredientShape {
  ingredientCreator = yup.object().shape({
    ingredientName: yup.string().required(),
    measurementUnit: yup.string(),
  });

  createdIngredient = yup.object().shape({
    ingredientId: yup.string().uuid(),
    ingredientName: yup.string().required(),
    measurementUnit: yup.string(),
  });
}

export default new IngredientShape();
