/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class CreateMovieEntity1774635408802 {
    name = 'CreateMovieEntity1774635408802'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "releaseDate" TIMESTAMP NOT NULL,
                CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title"),
                CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
            )
        `);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
