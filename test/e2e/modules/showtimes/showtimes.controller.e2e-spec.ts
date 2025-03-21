import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../src/app.module';
import { TestUtils } from '../../helpers/test.utils';
import { EntityNotFoundFilter } from '../../../../src/filters/entity-not-found.filter';
import { Movie } from '../../../../src/modules/movies/movie.entity';

describe('ShowtimesController (e2e)', () => {
  let app: INestApplication;
  let testUtils: TestUtils;
  let movie: Movie;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new EntityNotFoundFilter());
    await app.init();
    testUtils = new TestUtils(moduleFixture);
  });

  afterEach(async () => {
    await app.close();
  });

  beforeEach(async () => {
    movie = await testUtils.saveMovie({
      title: 'Movie 1',
      genre: 'Action',
      duration: 120,
      rating: 7.5,
      releaseYear: 2023,
    });
  });

  describe('Get', () => {
    it('should return 404 when showtime was not found', async () => {
      const response = await request(app.getHttpServer()).get('/showtimes/1');

      expect(response.status).toBe(404);
    });

    it('should return showtime successfully', async () => {
      const showtime = await testUtils.saveShowtime({
        movieId: movie.id,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: '2025-02-14T11:47:46.125405Z',
        endTime: '2025-02-14T14:47:46.125405Z',
      });

      const response = await request(app.getHttpServer()).get(
        `/showtimes/${showtime.id}`,
      );

      expect(response.status).toBe(200);
      expect(response.body.theater).toBe('Sample Theater');
    });
  });

  describe('Create', () => {
    it('should return showtime with id', async () => {
      const showtime = {
        movieId: movie.id,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: '2025-02-14T11:47:46.125405Z',
        endTime: '2025-02-14T14:47:46.125405Z',
      };

      const response = await request(app.getHttpServer())
        .post('/showtimes')
        .send(showtime)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
    });

    it('should return 400 when overlapping showtime for the same theater', async () => {
      await testUtils.saveShowtime({
        movieId: movie.id,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: '2025-02-14T11:47:46.125405Z',
        endTime: '2025-02-14T14:47:46.125405Z',
      });
      const newShowtime = {
        movieId: movie.id,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: '2025-02-14T12:47:46.125405Z',
        endTime: '2025-02-14T15:47:46.125405Z',
      };

      const response = await request(app.getHttpServer())
        .post('/showtimes')
        .send(newShowtime)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        'Showtime overlaps with an existing one.',
      );
    });

    it('should create showtime successfully when showtime has overlapping time but different theater', async () => {
      await testUtils.saveShowtime({
        movieId: movie.id,
        price: 20.2,
        theater: 'Cinema Theater',
        startTime: '2025-02-14T11:47:46.125405Z',
        endTime: '2025-02-14T14:47:46.125405Z',
      });
      const newShowtime = {
        movieId: movie.id,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: '2025-02-14T11:47:46.125405Z',
        endTime: '2025-02-14T14:47:46.125405Z',
      };

      const response = await request(app.getHttpServer())
        .post('/showtimes')
        .send(newShowtime)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
    });

    it('should return 400 when the showtime is invalid', async () => {
      const invalidShowtime = {
        movieId: movie.id,
        price: -20.2,
        theater: 'Sample Theater',
        startTime: '2025-02-14T11:47:46.125405Z',
        endTime: '2025-02-14T14:47:46.125405Z',
      };

      const response = await request(app.getHttpServer())
        .post('/showtimes')
        .send(invalidShowtime)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        'Price must be a positive number',
      );
    });
  });

  describe('Update', () => {
    it('should update a showtime successfully and return 200', async () => {
      const showtime = await testUtils.saveShowtime({
        movieId: movie.id,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: '2025-02-14T11:47:46.125405Z',
        endTime: '2025-02-14T14:47:46.125405Z',
      });
      const updatedShowtime = {
        movieId: movie.id,
        price: 25.5,
        theater: 'Sample Theater',
        startTime: '2025-02-14T11:47:46.125405Z',
        endTime: '2025-02-14T14:47:46.125405Z',
      };

      const response = await request(app.getHttpServer())
        .post(`/showtimes/update/${showtime.id}`)
        .send(updatedShowtime)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
      const updatedMovie = await testUtils.findShowtimeById(showtime.id);
      expect(updatedMovie).toHaveProperty('price', '25.50');
    });

    it('should return 400 when updated showtime is overlapping with existing one', async () => {
      await testUtils.saveShowtime({
        movieId: movie.id,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: '2025-02-14T11:47:46.125405Z',
        endTime: '2025-02-14T14:47:46.125405Z',
      });
      const showtime = await testUtils.saveShowtime({
        movieId: movie.id,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: '2025-02-14T15:47:46.125405Z',
        endTime: '2025-02-14T17:47:46.125405Z',
      });
      const updatedShowtime = {
        movieId: movie.id,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: '2025-02-14T12:47:46.125405Z',
        endTime: '2025-02-14T15:47:46.125405Z',
      };

      const response = await request(app.getHttpServer())
        .post(`/showtimes/update/${showtime.id}`)
        .send(updatedShowtime)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        'Showtime overlaps with an existing one.',
      );
    });

    it('should return 400 when the update showtime is invalid', async () => {
      const showtime = await testUtils.saveShowtime({
        movieId: movie.id,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: '2025-02-14T11:47:46.125405Z',
        endTime: '2025-02-14T14:47:46.125405Z',
      });
      const invalidUpdatedShowtime = {
        movieId: movie.id,
        price: 20.2,
        theater: '',
        startTime: '2025-02-14T11:47:46.125405Z',
        endTime: '2025-02-14T14:47:46.125405Z',
      };

      const response = await request(app.getHttpServer())
        .post(`/showtimes/update/${showtime.id}`)
        .send(invalidUpdatedShowtime)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.message).toContain('Theater should not be empty');
    });
  });

  describe('Delete', () => {
    it('should delete showtime by id', async () => {
      const existingShowtime = await testUtils.saveShowtime({
        movieId: movie.id,
        price: 20.2,
        theater: 'Sample Theater',
        startTime: '2025-02-14T11:47:46.125405Z',
        endTime: '2025-02-14T14:47:46.125405Z',
      });
      const response = await request(app.getHttpServer()).delete(
        `/showtimes/${existingShowtime.id}`,
      );

      expect(response.status).toBe(200);
      const deletedShowtime = await testUtils.findShowtimeById(
        existingShowtime.id,
      );
      expect(deletedShowtime).toBeNull();
    });
  });
});
