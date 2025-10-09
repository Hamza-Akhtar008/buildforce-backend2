import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import 'tsconfig-paths/register.js';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.{ts,js}'],
  synchronize: false,
  ssl: { rejectUnauthorized: false }, // enable if needed for hosted DBs
});

export default AppDataSource;
