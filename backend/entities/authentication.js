import typeorm from 'typeorm';

const Authentication = new typeorm.EntitySchema({
  name: 'Authentication',
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
    password_hash: { type: String },
  },
});

export default Authentication;
