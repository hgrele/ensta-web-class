import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    title: {
      type: String,
      unique: true,
    },
    release_date: { type: Date },
    main_actor: { type: String },
    description: { type: String },
  },
});

export default Movie;
