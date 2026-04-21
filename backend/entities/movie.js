import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    movie_id: {
      primary: true,
      generated: 'uuid',
      type: 'uuid',
    },
    title: {
      type: String,
      unique: true,
    },
    release_date: { type: Date },
    rating: {
      type: 'float',
      nullable: true,
    },
    description: { type: String },
    image_link: { type: String },
  },
  relations: {
    favorites: {
      type: 'one-to-many',
      target: 'Favorite',
      inverseSide: 'movie',
    },
  },
});

export default Movie;
