import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    user_id: {
      primary: true,
      generated: 'uuid',
      type: 'uuid',
    },
    email: {
      type: String,
      unique: true,
    },
    firstname: { type: String },
    lastname: { type: String },
    password_hash: { type: String },
    is_admin: { type: Boolean },
  },

  relations: {
    hateds: {
      type: 'one-to-many',
      target: 'Hated',
      inverseSide: 'user',
    },
  },
});

export default User;
