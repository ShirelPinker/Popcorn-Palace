import { BadRequestException, Injectable } from '@nestjs/common';
import { ShowtimeRepository } from './showtimes.repository';
import { Showtime } from './showtime.entity';
import { ShowtimeDto } from './dtos/showtime.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class ShowtimesService {
  constructor(private showtimeRepository: ShowtimeRepository) {}

  async getById(showtimeId: number): Promise<Showtime> {
    return this.showtimeRepository.getById(showtimeId);
  }

  async create(showtimeDto: ShowtimeDto): Promise<Showtime> {
    await this.assertNoOverlappingShowtime(showtimeDto);
    return this.showtimeRepository.create(showtimeDto);
  }

  async update(
    showtimeId: number,
    showtimeDto: ShowtimeDto,
  ): Promise<UpdateResult> {
    await this.assertNoOverlappingShowtime(showtimeDto, showtimeId);
    return this.showtimeRepository.update(showtimeId, showtimeDto);
  }

  async delete(showtimeId: number): Promise<DeleteResult> {
    return this.showtimeRepository.delete(showtimeId);
  }

  private async assertNoOverlappingShowtime(
    showtimeDto: ShowtimeDto,
    showtimeId?: number,
  ): Promise<void> {
    const isOverlapping = await this.isOverlapping(showtimeDto, showtimeId);
    if (isOverlapping) {
      throw new BadRequestException('Showtime overlaps with an existing one.');
    }
  }

  private async isOverlapping(
    showtimeDto: ShowtimeDto,
    showtimeId?: number,
  ): Promise<boolean> {
    const { theater, startTime, endTime } = showtimeDto;

    const overlappingShowtimes =
      await this.showtimeRepository.getOverlappingShowtimes(
        theater,
        startTime,
        endTime,
        showtimeId,
      );

    return overlappingShowtimes.length > 0;
  }
}
