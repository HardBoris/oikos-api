import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { ProductionDetail } from "./ProductionDetails";
import { User } from "./User";

@Entity("productions")
export class Production {
  @PrimaryGeneratedColumn("uuid")
  productionId?: string;

  @CreateDateColumn()
  productionDate?: Date;

  @ManyToOne(() => User, (user) => user.productions)
  @JoinColumn({ name: "userId" })
  user: User;

  @OneToMany(
    () => ProductionDetail,
    (productionDetail) => productionDetail.production,
    { eager: true }
  )
  productionDetails: ProductionDetail[];
}
