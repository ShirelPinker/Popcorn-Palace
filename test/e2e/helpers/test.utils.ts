import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TestingModule } from '@nestjs/testing';
import { Movie } from '../../../src/modules/movies/movie.entity';
import { Showtime } from '../../../src/modules/showtimes/showtime.entity';
import { MovieDto } from '../../../src/modules/movies/dtos/movie.dto';
import { ShowtimeDto } from '../../../src/modules/showtimes/dtos/showtime.dto';
import { BookingDto } from '../../../src/modules/bookings/dtos/booking.dto';
import { Booking } from '../../../src/modules/bookings/booking.entity';

export class TestUtils {
  private movieRepository: Repository<Movie>;
  private showtimeRepository: Repository<Showtime>;
  private bookingRepository: Repository<Booking>;

  constructor(moduleFixture: TestingModule) {
    this.movieRepository = moduleFixture.get<Repository<Movie>>(
      getRepositoryToken(Movie),
    );
    this.showtimeRepository = moduleFixture.get<Repository<Showtime>>(
      getRepositoryToken(Showtime),
    );
    this.bookingRepository = moduleFixture.get<Repository<Booking>>(
      getRepositoryToken(Booking),
    );
  }

  async saveMovie(movieData: MovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(movieData);
    return this.movieRepository.save(movie);
  }

  async findMovieByTitle(movieTitle: string): Promise<Movie> {
    return this.movieRepository.findOne({ where: { title: movieTitle } });
  }

  async saveShowtime(showtimeDto: ShowtimeDto): Promise<Showtime> {
    const showtime = this.showtimeRepository.create(showtimeDto);
    return this.showtimeRepository.save(showtime);
  }

  async saveBooking(bookingDto: BookingDto): Promise<Booking> {
    const booking = this.bookingRepository.create(bookingDto);
    return this.bookingRepository.save(booking);
  }

  async findShowtimeById(showtimeId: number): Promise<Showtime> {
    return this.showtimeRepository.findOneBy({ id: showtimeId });
  }

  async createTestShowtime(): Promise<Showtime> {
    const movie = await this.saveMovie({
      title: 'Movie 1',
      genre: 'Action',
      duration: 120,
      rating: 7.5,
      releaseYear: 2023,
    });
    return this.saveShowtime({
      movieId: movie.id,
      price: 20.2,
      theater: 'Sample Theater',
      startTime: '2025-02-14T11:47:46.125405Z',
      endTime: '2025-02-14T14:47:46.125405Z',
    });
  }
}
