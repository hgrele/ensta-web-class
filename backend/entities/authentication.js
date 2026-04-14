import typeorm from 'typeorm';

// done like this for migration practice
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
    is_admin: { type: Boolean },
  },
});

export default Authentication;
