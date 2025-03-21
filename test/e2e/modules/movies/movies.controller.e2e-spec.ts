import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../src/app.module';
import { TestUtils } from '../../helpers/test.utils';
import { MovieDto } from '../../../../src/modules/movies/dtos/movie.dto';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;
  let testUtils: TestUtils;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());

    await app.init();

    testUtils = new TestUtils(moduleFixture);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('Get', () => {
    it('should return an empty array when no movies', async () => {
      const response = await request(app.getHttpServer()).get('/movies/all');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return movies after insertion', async () => {
      await testUtils.saveMovie({
        title: 'Movie 1',
        genre: 'Action',
        duration: 120,
        rating: 7.5,
        releaseYear: 2023,
      });
      await testUtils.saveMovie({
        title: 'Movie 2',
        genre: 'Comedy',
        duration: 90,
        rating: 6.8,
        releaseYear: 2022,
      });

      const response = await request(app.getHttpServer()).get('/movies/all');

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('title', 'Movie 1');
    });
  });

  describe('Create', () => {
    it('should return movie with id', async () => {
      const newMovie = {
        title: 'Movie 1',
        genre: 'Action',
        duration: 120,
        rating: 7.5,
        releaseYear: 2023,
      };

      const response = await request(app.getHttpServer())
        .post('/movies')
        .send(newMovie)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title', 'Movie 1');
    });

    it('should return 400 when the movie is invalid', async () => {
      const invalidMovie = {
        title: '',
        genre: 'Action',
        duration: 120,
        rating: 7.8,
        releaseYear: 2023,
      };

      const response = await request(app.getHttpServer())
        .post('/movies')
        .send(invalidMovie)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Title should not be empty');
    });
  });

  describe('Update', () => {
    it('should update a movie successfully and return 200', async () => {
      const existingMovie = await testUtils.saveMovie({
        title: 'Movie 1',
        genre: 'Action',
        duration: 120,
        rating: 7.5,
        releaseYear: 2023,
      });
      const movieDto: MovieDto = {
        title: 'Updated Movie 1',
        genre: 'Adventure',
        duration: 130,
        rating: 8.0,
        releaseYear: 2025,
      };

      const response = await request(app.getHttpServer())
        .post(`/movies/update/${existingMovie.title}`)
        .send(movieDto);

      expect(response.status).toBe(200);
      const updatedMovie = await testUtils.findMovieByTitle(movieDto.title);
      expect(updatedMovie).toHaveProperty('title', 'Updated Movie 1');
    });

    it('should return 404 when the movie is not found', async () => {
      const nonExistingTitle = 'Non Existing Movie';
      const movieDto: MovieDto = {
        title: 'Updated Movie 1',
        genre: 'Adventure',
        duration: 130,
        rating: 8.0,
        releaseYear: 2025,
      };

      const response = await request(app.getHttpServer())
        .post(`/movies/update/${nonExistingTitle}`)
        .send(movieDto);

      expect(response.status).toBe(404);
      expect(response.body.message).toContain('Movie not found');
    });

    it('should return 400 when movie is invalid', async () => {
      const existingMovie = await testUtils.saveMovie({
        title: 'Movie 1',
        genre: 'Action',
        duration: 120,
        rating: 7.5,
        releaseYear: 2023,
      });
      const invalidMovieDto = {
        title: 'Movie 1',
        genre: 'Action',
        duration: -50,
        rating: 7.8,
        releaseYear: 2023,
      };

      const response = await request(app.getHttpServer())
        .post(`/movies/update/${existingMovie.title}`)
        .send(invalidMovieDto);

      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        'Duration must be a positive number',
      );
    });
  });

  describe('Delete', () => {
    it('should delete movie by title', async () => {
      const existingMovie = await testUtils.saveMovie({
        title: 'Movie 1',
        genre: 'Action',
        duration: 120,
        rating: 7.5,
        releaseYear: 2023,
      });

      const response = await request(app.getHttpServer()).delete(
        `/movies/${existingMovie.title}`,
      );

      expect(response.status).toBe(200);
      const updatedMovie = await testUtils.findMovieByTitle(
        existingMovie.title,
      );
      expect(updatedMovie).toBeNull();
    });
  });
});
