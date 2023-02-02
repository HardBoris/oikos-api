import * as yup from "yup";

class PurchaseDetailShape {
  purchaseDetailCreator = yup.object().shape({
    ingredientQty: yup.number().required(),
    ingredientPrice: yup.number().required(),
  });

  createdPurchaseDetail = yup.object().shape({
    purchaseDetailId: yup.string().uuid(),
    ingredientQty: yup.number(),
    ingredientPrice: yup.number(),
    ingredient: yup.object().shape({
      ingredientId: yup.string(),
      ingredientName: yup.string(),
    }),
  });

  updatedPurchaseDetail = yup.object().shape({
    purchaseDetailId: yup.string().uuid(),
    ingredientQty: yup.number(),
    ingredientPrice: yup.number(),
    ingredient: yup.object().shape({
      ingredientId: yup.string(),
      ingredientName: yup.string(),
    }),
  });
}

export default new PurchaseDetailShape();
