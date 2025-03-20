import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'popcorn-palace',
  password: process.env.DB_PASSWORD || 'popcorn-palace',
  database: process.env.DB_NAME || 'popcorn-palace',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  synchronize: true,
};
