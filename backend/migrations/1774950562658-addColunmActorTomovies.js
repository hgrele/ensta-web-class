import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export class AddColunmActorTomovies1774950562658 {
    name = 'AddColunmActorTomovies1774950562658'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "main_actor" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "release_date"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "release_date" TIMESTAMP NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "description"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "description" character varying NOT NULL
        `);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "description"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "description" text NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "release_date"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "release_date" date NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "main_actor"
        `);
    }
}
