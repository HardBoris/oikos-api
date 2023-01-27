import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { PurchaseDetail } from "../entities";

interface IPurchaseDetailRepo {
  save: (purchaseDetail: PurchaseDetail) => Promise<PurchaseDetail>;
  all: () => Promise<PurchaseDetail[]>;
  findOne: (payload: object) => Promise<PurchaseDetail>;
}

class PurchaseDetailRepo implements IPurchaseDetailRepo {
  private ormRepo: Repository<PurchaseDetail>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(PurchaseDetail);
  }

  save = async (purchaseDetail: Partial<PurchaseDetail>) =>
    await this.ormRepo.save(purchaseDetail);
  all = async () => await this.ormRepo.find();
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
}

export default new PurchaseDetailRepo();
