import { Module } from '@nestjs/common';
import { MoviesModule } from './modules/movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/database.config';
import { ShowtimesModule } from './modules/showtimes/showtimes.module';

@Module({
  imports: [
    // Load environment variables from .env file
    ConfigModule.forRoot({
      isGlobal: true, // Makes env variables accessible globally
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    MoviesModule,
    ShowtimesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
