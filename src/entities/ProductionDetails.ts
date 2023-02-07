import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Production } from "./Production";

@Entity("production_details")
export class ProductionDetail {
  @PrimaryGeneratedColumn("uuid")
  productionDetailId?: string;

  @Column()
  recipeName: string;

  @Column({ type: "float" })
  recipeQty: number;

  @ManyToOne(() => Production, (production) => production.productionDetails)
  @JoinColumn({ name: "productionId" })
  production: Production;
}
