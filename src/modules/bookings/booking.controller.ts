import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dtos/booking.dto';
import { BookingResponseDto } from './dtos/booking-response.dto';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @HttpCode(200)
  async createBooking(
    @Body() bookingDto: BookingDto,
  ): Promise<BookingResponseDto> {
    const booking = await this.bookingService.create(bookingDto);
    return { bookingId: booking.id };
  }
}
