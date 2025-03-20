import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingRepository } from './booking.repository';
import { Booking } from './booking.entity';
import { BookingDto } from './dtos/booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly bookingRepository: BookingRepository) {}

  async create(bookingDto: BookingDto): Promise<Booking> {
    await this.assertSeatAvailable(bookingDto);
    return this.bookingRepository.create(bookingDto);
  }

  private async assertSeatAvailable(bookingDto: BookingDto): Promise<void> {
    const { showtimeId, seatNumber } = bookingDto;

    const existingBooking = await this.bookingRepository.findOneBy(
      showtimeId,
      seatNumber,
    );

    if (existingBooking) {
      throw new BadRequestException(
        'Seat is already booked for this showtime.',
      );
    }
  }
}
