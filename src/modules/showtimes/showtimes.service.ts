import { Injectable, NotFoundException } from '@nestjs/common';
import { ShowtimeRepository } from './showtimes.repository';
import { Showtime } from './showtime.entity';
import { CreateShowtimeDto } from './dtos/create-showtime.dto';
import { UpdateShowtimeDto } from './dtos/update-showtime.dto';

@Injectable()
export class ShowtimesService {
  constructor(private readonly showtimeRepository: ShowtimeRepository) {}

  async getById(showtimeId: number): Promise<Showtime> {
    const showtime = await this.showtimeRepository.getById(showtimeId);
    if (!showtime) {
      throw new NotFoundException('Showtime not found');
    }
    return showtime;
  }

  async create(showtimeData: CreateShowtimeDto): Promise<Showtime> {
    const { theater, startTime, endTime } = showtimeData;

    const overlapExists = await this.showtimeRepository.isShowtimeOverlapping(
      theater,
      startTime,
      endTime,
    );

    if (overlapExists) {
      throw new Error('Showtime overlaps with an existing one.');
    }

    const newShowtime = this.showtimeRepository.create(showtimeData);
    return this.showtimeRepository.saveShowtime(newShowtime);
  }

  async update(showtimeId: number, updateData: UpdateShowtimeDto) {
    return this.showtimeRepository.updateShowtime(showtimeId, updateData);
  }

  async delete(showtimeId: number) {
    return this.showtimeRepository.deleteShowtime(showtimeId);
  }
}
