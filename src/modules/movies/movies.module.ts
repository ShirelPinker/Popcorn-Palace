import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MoviesRepository } from './movies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  exports: [TypeOrmModule],
  controllers: [MoviesController],
  providers: [MoviesService, MoviesRepository],
})
export class MoviesModule {}
