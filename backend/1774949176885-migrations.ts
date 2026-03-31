import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1774949176885 implements MigrationInterface {
    name = 'Migrations1774949176885'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "release_date"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "release_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "release_date"`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "release_date" date NOT NULL`);
    }

}
