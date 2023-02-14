import * as yup from "yup";

class ProductionDetailShape {
  productionDetailCreator = yup.object().shape({
    recipeName: yup.number().required(),
    recipeQty: yup.number().required(),
  });

  detailsCreator = yup.object().shape({
    purchaseDetails: yup.array().of(
      yup.object().shape({
        recipeName: yup.string().lowercase().required(),
        recipeQty: yup.number().positive().required(),
      })
    ),
  });
}

export default new ProductionDetailShape();
