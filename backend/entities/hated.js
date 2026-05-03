import typeorm from 'typeorm';

const Hated = new typeorm.EntitySchema({
  name: 'Hated',
  columns: {
    user_id: {
      type: 'uuid',
      primary: true,
    },
    movie_id: {
      type: 'uuid',
      primary: true,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'User',
      joinColumn: { name: 'user_id' },
      onDelete: 'CASCADE',
    },
    movie: {
      type: 'many-to-one',
      target: 'Movie',
      joinColumn: { name: 'movie_id' },
      onDelete: 'CASCADE',
    },
  },
});

export default Hated;
