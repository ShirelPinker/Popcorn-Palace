import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule } from '@nestjs/testing';
import { Movie } from '../../../src/modules/movies/movie.entity';

export class TestUtils {
  private movieRepository: Repository<Movie>;

  constructor(moduleFixture: TestingModule) {
    this.movieRepository = moduleFixture.get<Repository<Movie>>(
      getRepositoryToken(Movie),
    );
  }

  async saveMovie(movieData: Partial<Movie>): Promise<Movie> {
    const movie = this.movieRepository.create(movieData);
    return this.movieRepository.save(movie);
  }

  async findMovieByTitle(movieTitle: string): Promise<Movie> {
    return this.movieRepository.findOne({ where: { title: movieTitle } });
  }
}
