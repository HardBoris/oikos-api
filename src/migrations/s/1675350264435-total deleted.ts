import { MigrationInterface, QueryRunner } from "typeorm";

export class totalDeleted1675350264435 implements MigrationInterface {
    name = 'totalDeleted1675350264435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP COLUMN "purchaseTotal"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" ADD "purchaseTotal" double precision NOT NULL DEFAULT '0'`);
    }

}
