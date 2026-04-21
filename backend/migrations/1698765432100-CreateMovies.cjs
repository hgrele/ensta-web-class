/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class CreateMovies1698765432100 {
    name = 'CreateMovies1698765432100'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "description" text NOT NULL,
                "release_date" date NOT NULL,
                CONSTRAINT "unique_title" UNIQUE ("title"),
                CONSTRAINT "primary_key_id" PRIMARY KEY ("id")
            )
            `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "movie"`);
    }
}
