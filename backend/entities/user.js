import typeorm from 'typeorm';

const User = new typeorm.EntitySchema({
  name: 'User',
  columns: {
    id: {
      primary: true,
      generated: 'uuid',
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    firstname: { type: String },
    lastname: { type: String },
    hash: { type: String },
  },
});

export default User;
