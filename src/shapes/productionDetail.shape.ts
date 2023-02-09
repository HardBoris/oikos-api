import * as yup from "yup";

class ProductionDetailShape {
  productionDetailCreator = yup.object().shape({
    recipeName: yup.number().required(),
    recipeQty: yup.number().required(),
  });
}

export default new ProductionDetailShape();
