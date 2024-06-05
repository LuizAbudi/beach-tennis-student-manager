import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_LOCAL_HOST,
  port: process.env.MYSQL_LOCAL_PORT
    ? parseInt(process.env.MYSQL_LOCAL_PORT)
    : 3307,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  entities: ['/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'],
});

export default dataSource;
