import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.findAll();
  }

  async create(movieData: Partial<Movie>): Promise<Movie> {
    return this.moviesRepository.create(movieData);
  }

  async update(movieTitle: string, updateData: Partial<Movie>) {
    return this.moviesRepository.update(movieTitle, updateData);
  }

  async delete(movieTitle: string) {
    return this.moviesRepository.delete(movieTitle);
  }
}
