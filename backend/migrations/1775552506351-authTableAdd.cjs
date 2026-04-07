/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AuthTableAdd1775552506351 {
    name = 'AuthTableAdd1775552506351'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "authentication" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "email" character varying NOT NULL,
                "password_hash" character varying NOT NULL,
                CONSTRAINT "UQ_abc878c952c2769f239103b2d59" UNIQUE ("email"),
                CONSTRAINT "PK_684fcb9924c8502d64b129cc8b1" PRIMARY KEY ("id")
            )
        `);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "authentication"
        `);
    }
}
