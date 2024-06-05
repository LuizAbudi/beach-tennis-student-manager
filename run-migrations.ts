import 'dotenv/config';
import dataSource from './src/database/db-datasource';

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    return dataSource.runMigrations();
  })
  .then(() => {
    console.log('Migrations have been run');
    process.exit(0);
  })
  .catch((err) => {
    console.error(
      'Error during Data Source initialization or migration run',
      err,
    );
    process.exit(1);
  });
