import { Module } from '@nestjs/common';
import { MoviesModule } from './modules/movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/database.config';

@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true, // Makes env variables accessible globally
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
