import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TestUtils } from '../../helpers/test.utils';
import { Showtime } from '../../../../src/modules/showtimes/showtime.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../src/app.module';
import * as request from 'supertest';
import { EntityNotFoundFilter } from '../../../../src/filters/entity-not-found.filter';

describe('BookingController (e2e)', () => {
  let app: INestApplication;
  let testUtils: TestUtils;
  let showtime: Showtime;
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
    showtime = await testUtils.createTestShowtime();
  });

  describe('Create', () => {
    it('should create and return booking id', async () => {
      const booking = {
        showtimeId: showtime.id,
        seatNumber: 15,
        userId: '84438967-f68f-4fa0-b620-0f08217e76af',
      };

      const response = await request(app.getHttpServer())
        .post('/bookings')
        .send(booking)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('bookingId');
    });

    it('should return 400 when the booking is invalid', async () => {
      const invalidBooking = {
        showtimeId: showtime.id,
        seatNumber: -15,
        userId: '84438967-f68f-4fa0-b620-0f08217e76af',
      };

      const response = await request(app.getHttpServer())
        .post('/bookings')
        .send(invalidBooking)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        'Seat number must be a positive number',
      );
    });

    it('should return 400 when seat is already booked for the exact showtime', async () => {
      await testUtils.saveBooking({
        showtimeId: showtime.id,
        seatNumber: 15,
        userId: '84438967-f68f-4fa0-b620-0f08217e76af',
      });
      const booking = {
        showtimeId: showtime.id,
        seatNumber: 15,
        userId: '66438967-f68f-4fa0-b620-3208217e76af',
      };

      const response = await request(app.getHttpServer())
        .post('/bookings')
        .send(booking)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(400);
      expect(response.body.message).toContain(
        'Seat is already booked for this showtime.',
      );
    });
  });
});
