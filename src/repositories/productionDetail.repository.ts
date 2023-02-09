import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { ProductionDetail } from "../entities";

interface IProDetRepo {
  save: (proDet: ProductionDetail) => Promise<ProductionDetail>;
  all: () => Promise<ProductionDetail[]>;
  findOne: (payload: object) => Promise<ProductionDetail>;
}

class ProDetRepo implements IProDetRepo {
  private ormRepo: Repository<ProductionDetail>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(ProductionDetail);
  }

  save = async (proDet: Partial<ProductionDetail>) =>
    await this.ormRepo.save(proDet);
  all = async () => await this.ormRepo.find();
  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
}

export default new ProDetRepo();
