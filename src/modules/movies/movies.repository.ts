import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async create(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.movieRepository.create(movieData);
    return this.movieRepository.save(movie);
  }

  async update(movieTitle: string, updateData: Partial<Movie>) {
    return this.movieRepository.update({ title: movieTitle }, updateData);
  }

  async delete(movieTitle: string) {
    return this.movieRepository.delete({ title: movieTitle });
  }
}
