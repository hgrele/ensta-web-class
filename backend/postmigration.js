import { readdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';

const migrationsDir = 'migrations';
const files = readdirSync(migrationsDir).filter((f) => f.endsWith('.js'));

// Check for unnamed migration (generated without --name flag)
const unnamed = files.filter((f) => f.endsWith('-migrations.js'));
if (unnamed.length > 0) {
  unnamed.forEach((f) => unlinkSync(join(migrationsDir, f)));
  console.error(
    '\x1b[31mYou forgot to give your migration file a name. Please run the command again with a --name flag.\x1b[0m',
  );
  process.exit(1);
}

// Convert CommonJS to ES module syntax
for (const file of files) {
  const filePath = join(migrationsDir, file);
  let content = readFileSync(filePath, 'utf8');

  content = content.replace(
    'const { MigrationInterface, QueryRunner } = require("typeorm");',
    'import typeorm from "typeorm";\n\nconst { MigrationInterface, QueryRunner } = typeorm;',
  );
  content = content.replace('module.exports = class', 'export default class');

  writeFileSync(filePath, content, 'utf8');
}
