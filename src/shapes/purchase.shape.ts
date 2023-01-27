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
  });
}

export default new PurchaseShape();
