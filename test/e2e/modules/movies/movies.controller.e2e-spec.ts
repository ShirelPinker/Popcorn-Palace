import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../../../../src/modules/movies/movie.entity';
import { MoviesController } from '../../../../src/modules/movies/movies.controller';
import { MoviesService } from '../../../../src/modules/movies/movies.service';
import { Showtime } from '../../../../src/modules/showtimes/showtime.entity';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;
  let movieRepository: Repository<Movie>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'popcorn-palace-e2e',
          password: 'popcorn-palace-e2e',
          database: 'popcorn-palace-e2e',
          entities: [Movie, Showtime],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([Movie, Showtime]),
      ],
      controllers: [MoviesController],
      providers: [MoviesService],
    }).compile();

    app = moduleFixture.createNestApplication();
    movieRepository = moduleFixture.get(getRepositoryToken(Movie));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {});

  afterEach(async () => {});

  it('/movies/all (GET) should return an empty array initially', async () => {
    const response = await request(app.getHttpServer()).get('/movies/all');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('/movies/all (GET) should return movies after insertion', async () => {
    await movieRepository.save(
      await movieRepository.save([
        {
          title: 'Movie 1',
          genre: 'Action', // Example genre
          duration: 120, // Example duration in minutes
          rating: 7.5, // Example rating
          releaseYear: 2023, // Example release year
          showtimes: [], // Optionally provide showtimes or leave empty if not required
        },
        {
          title: 'Movie 2',
          genre: 'Comedy', // Example genre
          duration: 90, // Example duration in minutes
          rating: 6.8, // Example rating
          releaseYear: 2022, // Example release year
          showtimes: [], // Optionally provide showtimes or leave empty if not required
        },
      ]),
    );

    const response = await request(app.getHttpServer()).get('/movies/all');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('title', 'Movie 1');
  });
});
