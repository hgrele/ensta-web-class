/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class MovieFieldUpdateRating1776782253056 {
    name = 'MovieFieldUpdateRating1776782253056'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME COLUMN "main_actor" TO "rating"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "rating"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "rating" integer NOT NULL
        `);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "rating"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "rating" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
                RENAME COLUMN "rating" TO "main_actor"
        `);
    }
}
