import * as yup from "yup";

class IngredientShape {
  ingredient = yup.object().shape({
    ingredientName: yup.string().required(),
    measurementUnit: yup.string(),
  });
}

export default new IngredientShape();
