import { execSync } from 'child_process';

const name = process.env.npm_config_name;
if (!name) {
  console.error(
    '\x1b[31mYou forgot to give your migration a name. Please run: npm run migration:generate --name=YourMigrationName\x1b[0m',
  );
  process.exit(1);
}

execSync(
  `typeorm --dataSource='./datasource.js' migration:generate --outputJs --pretty migrations/${name}`,
  { stdio: 'inherit' },
);
