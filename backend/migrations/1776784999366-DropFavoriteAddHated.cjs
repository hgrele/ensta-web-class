/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class DropFavoriteAddHated1776784999366 {
    name = 'DropFavoriteAddHated1776784999366'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "hated" (
                "user_id" uuid NOT NULL,
                "movie_id" uuid NOT NULL,
                CONSTRAINT "PK_544ae7a68fdf4d7e3fe4ef31dfd" PRIMARY KEY ("user_id", "movie_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "hated"
            ADD CONSTRAINT "FK_8ffcdd726a896e71f8a6411bcfa" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "hated"
            ADD CONSTRAINT "FK_d17e4df06019b673325542b6cb9" FOREIGN KEY ("movie_id") REFERENCES "movie"("movie_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            DROP TABLE "favorite"
        `);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "hated" DROP CONSTRAINT "FK_d17e4df06019b673325542b6cb9"
        `);
        await queryRunner.query(`
            ALTER TABLE "hated" DROP CONSTRAINT "FK_8ffcdd726a896e71f8a6411bcfa"
        `);
        await queryRunner.query(`
            DROP TABLE "hated"
        `);
    }
}
