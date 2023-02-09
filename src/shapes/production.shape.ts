import * as yup from "yup";

class ProductionShape {
  productionCreator = yup.object().shape({
    productionId: yup.string(),
    productionDate: yup.date(),
  });
}

export default new ProductionShape();
