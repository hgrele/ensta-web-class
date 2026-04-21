
/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 * @typedef {import('typeorm').QueryRunner} QueryRunner
 */

const fs = require('fs');


/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class PopulateMovies1776784234222 {
    name = 'PopulateMovies1776784234222'

    /**
     * @param {QueryRunner} queryRunner
     */
    async up(queryRunner) {
        const jsonPath =  '../backend/misc/movies_data.json';

  

        const rawData = fs.readFileSync(jsonPath, 'utf8');
        const moviesData = JSON.parse(rawData); 

        for (const data of moviesData) {
            // Use the queryRunner manager to bypass Repository/Entity conflicts
            await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into("movie")
                .values({
                    title: data.title,
                    release_date: data.release_date ? new Date(data.release_date) : null,
                    description: data.description,
                    image_link: data.image_link, 
                    rating: data.rating 
                })
                
                .orIgnore() 
                .execute();
        }
    }

    /**
     * @param {QueryRunner} queryRunner
     */
    async down(queryRunner) {
        // Typically, we don't delete data in a down migration unless 
        // you want to clear the table when reverting
        await queryRunner.query(`DELETE FROM "movie"`);
    }
}