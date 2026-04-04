/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
export default class AddHashColumnToUserTable1775302338278 {
    name = 'AddHashColumnToUserTable1775302338278'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "hash" character varying NOT NULL
        `);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "hash"
        `);
    }
}
