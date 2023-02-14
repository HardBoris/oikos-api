import * as yup from "yup";

class PurchaseDetailShape {
  purchaseDetailCreator = yup.object().shape({
    ingredientQty: yup.number().required(),
    ingredientPrice: yup.number().required(),
  });

  purchaseDetail = yup.object().shape({
    purchaseDetailId: yup.string().uuid(),
    ingredientQty: yup.number(),
    ingredientPrice: yup.number(),
    ingredient: yup.string(),
    purchase: yup.string(),
  });

  updatedPurchaseDetail = yup.object().shape({
    purchaseDetailId: yup.string().uuid(),
    ingredientQty: yup.number(),
    ingredientPrice: yup.number(),
    ingredient: yup.string(),
    purchase: yup.string(),
  });

  detailsCreator = yup.object().shape({
    purchaseDetails: yup
      .array()
      .of(
        yup
          .object()
          .shape({
            ingredientName: yup.string().lowercase().required(),
            ingredientQty: yup.number().positive().required(),
            measurementUnit: yup.string().lowercase().required(),
            ingredientPrice: yup.number().positive().required(),
          })
          .required()
      )
      .required(),
  });
}

export default new PurchaseDetailShape();
