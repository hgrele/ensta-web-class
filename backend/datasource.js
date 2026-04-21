import { DataSource } from 'typeorm';
import Favorite from './entities/favorite.js';
import Movie from './entities/movie.js';
import User from './entities/user.js';

export const appDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [User, Movie, Favorite],
  migrations: ['migrations/*.cjs'],
  cli: {
    migrationsDir: 'migrations',
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
