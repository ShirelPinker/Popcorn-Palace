import { Injectable } from '@nestjs/common';
import { MoviesRepository } from './movies.repository';
import { Movie } from './movie.entity';
import { MovieDto } from './dtos/movie.dto';

@Injectable()
export class MoviesService {
  constructor(private moviesRepository: MoviesRepository) {}

  async findAll(): Promise<Movie[]> {
    return this.moviesRepository.findAll();
  }

  async create(movieDto: MovieDto): Promise<Movie> {
    return this.moviesRepository.create(movieDto);
  }

  async update(movieTitle: string, movieDto: MovieDto): Promise<void> {
    await this.moviesRepository.update(movieTitle, movieDto);
    return;
  }

  async delete(movieTitle: string): Promise<void> {
    await this.moviesRepository.delete(movieTitle);
    return;
  }
}
