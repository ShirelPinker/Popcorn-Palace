import { Injectable, NotFoundException } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { Movie } from './movie.entity';
import { MovieDto } from './dtos/movie.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class MoviesService {
  constructor(private moviesRepository: MoviesRepository) {}

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.findAll();
  }

  async create(movieDto: MovieDto): Promise<Movie> {
    return this.moviesRepository.create(movieDto);
  }

  async update(movieTitle: string, movieDto: MovieDto): Promise<UpdateResult> {
    const movie = await this.findMovieByTitle(movieTitle);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    return this.moviesRepository.update(movieTitle, movieDto);
  }

  async delete(movieTitle: string): Promise<DeleteResult> {
    return this.moviesRepository.delete(movieTitle);
  }

  private async findMovieByTitle(movieTitle: string): Promise<Movie | null> {
    return this.moviesRepository.findOne(movieTitle);
  }
}
