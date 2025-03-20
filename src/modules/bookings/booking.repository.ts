import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './booking.entity';
import { BookingDto } from './dtos/booking.dto';

@Injectable()
export class BookingRepository {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(bookingData: BookingDto): Promise<Booking> {
    const booking = this.bookingRepository.create(bookingData);
    return this.bookingRepository.save(booking);
  }

  async findOneBy(
    showtimeId: number,
    seatNumber: number,
  ): Promise<Booking | null> {
    return this.bookingRepository.findOne({
      where: {
        showtime: { id: showtimeId },
        seatNumber: seatNumber,
      },
    });
  }
}
