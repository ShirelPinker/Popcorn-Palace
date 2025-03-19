import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
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

  async update(
    movieTitle: string,
    updateData: Partial<Movie>,
  ): Promise<UpdateResult> {
    return this.movieRepository.update({ title: movieTitle }, updateData);
  }

  async delete(movieTitle: string): Promise<DeleteResult> {
    return this.movieRepository.delete({ title: movieTitle });
  }
}
