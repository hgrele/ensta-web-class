

/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

const bcrypt = require('bcrypt');

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class PopulateUsers1776784234223 {
    name = 'PopulateUsers1776784234223'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        const saltRounds = 10;

        const usersToCreate = [
            {
                firstname: 'Caio',
                lastname: 'Dourado',
                email: 'admin@example.com',
                password: 'admin',
                is_admin: true
            },
            {
                firstname: 'Jane',
                lastname: 'Dae',
                email: 'jane@example.com',
                password: 'jane',
                is_admin: false
            },
            {
                firstname: 'John',
                lastname: 'Doe',
                email: 'john@example.com',
                password: 'john',
                is_admin: false
            }
        ];

        for (const user of usersToCreate) {
            const hash = await bcrypt.hash(user.password, saltRounds);

            await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into("user")
                .values({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    password_hash: hash,
                    is_admin: user.is_admin
                })
                .orIgnore() 
                .execute();
        }
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        // Cleaning up the created users [cite: 19]
        await queryRunner.query(`
            DELETE FROM "user" 
            WHERE "email" IN ('admin@example.com', 'jane.doe@example.com')
        `);
    }
}