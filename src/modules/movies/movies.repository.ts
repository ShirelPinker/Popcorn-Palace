import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MovieDto } from './dtos/movie.dto';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  async create(movieDto: MovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(movieDto);
    return this.movieRepository.save(movie);
  }

  async update(
    movieTitle: string,
    movieDto: MovieDto,
  ): Promise<UpdateResult> {
    return this.movieRepository.update({ title: movieTitle }, movieDto);
  }

  async delete(movieTitle: string): Promise<DeleteResult> {
    return this.movieRepository.delete({ title: movieTitle });
  }
}
