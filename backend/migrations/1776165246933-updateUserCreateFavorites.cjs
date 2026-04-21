/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class UpdateUserCreateFavorites1776165246933 {
    name = 'UpdateUserCreateFavorites1776165246933'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "favorite" (
                "user_id" uuid NOT NULL,
                "movie_id" uuid NOT NULL,
                CONSTRAINT "PK_1639bfa98d40d767951122b28d3" PRIMARY KEY ("user_id", "movie_id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "primary_key_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "user_id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "password_hash" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "is_admin" boolean NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "movie_id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_f38244c6e76d8e50e1a590f6744" PRIMARY KEY ("movie_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "image_link" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite"
            ADD CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite"
            ADD CONSTRAINT "FK_407f83234166eae1334b6f0aa87" FOREIGN KEY ("movie_id") REFERENCES "movie"("movie_id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "favorite" DROP CONSTRAINT "FK_407f83234166eae1334b6f0aa87"
        `);
        await queryRunner.query(`
            ALTER TABLE "favorite" DROP CONSTRAINT "FK_e666fc7cc4c80fba1944daa1a74"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "image_link"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_f38244c6e76d8e50e1a590f6744"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "movie_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "is_admin"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "password_hash"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "PK_758b8ce7c18b9d347461b30228d"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "primary_key_id" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            DROP TABLE "favorite"
        `);
    }
}
