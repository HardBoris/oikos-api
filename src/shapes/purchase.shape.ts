import * as yup from "yup";

class PurchaseShape {
  purchaseCreator = yup.object().shape({
    purchaseId: yup.string(),
    user: yup.string(),
    purchaseDate: yup.date(),
  });

  createdPurchase = yup.object().shape({
    purchaseId: yup.string().uuid().required(),
    purchaseDate: yup.string().required(),
    purchaseDetails: yup.array().of(
      yup.object().shape({
        purchaseDetailId: yup.string().uuid().required(),
        ingredientQty: yup.number().required(),
        ingredientPrice: yup.number().required(),
        ingredient: yup.object().shape({
          ingredientId: yup.string(),
          ingredientName: yup.string(),
        }),
      })
    ),
  });
}

export default new PurchaseShape();
