/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class MovieFieldUpdateRatingType1776783301097 {
    name = 'MovieFieldUpdateRatingType1776783301097'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "rating"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "rating" double precision
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
            ADD "rating" integer NOT NULL
        `);
    }
}
