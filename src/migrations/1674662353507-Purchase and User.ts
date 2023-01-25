import { MigrationInterface, QueryRunner } from "typeorm";

export class PurchaseAndUser1674662353507 implements MigrationInterface {
    name = 'PurchaseAndUser1674662353507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userId" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "purchase" ("purchaseId" uuid NOT NULL DEFAULT uuid_generate_v4(), "purchaseDate" TIMESTAMP NOT NULL DEFAULT now(), "purchaseTotal" integer NOT NULL DEFAULT '0', "userUserId" uuid, CONSTRAINT "PK_9c8db52e14c0fff5873059251fd" PRIMARY KEY ("purchaseId"))`);
        await queryRunner.query(`ALTER TABLE "purchase" ADD CONSTRAINT "FK_f22c74ddfefb53c4ba7bc58b04c" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "purchase" DROP CONSTRAINT "FK_f22c74ddfefb53c4ba7bc58b04c"`);
        await queryRunner.query(`DROP TABLE "purchase"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
