import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Showtime } from './showtime.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateShowtimeDto } from './dtos/create-showtime.dto';

@Injectable()
export class ShowtimeRepository {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
  ) {}

  async getById(showtimeId: number): Promise<Showtime | null> {
    return this.showtimeRepository.findOne({ where: { id: showtimeId } });
  }

  async isShowtimeOverlapping(
    theater: string,
    startTime: string,
    endTime: string,
  ): Promise<boolean> {
    const count = await this.showtimeRepository
      .createQueryBuilder('showtimes')
      .where('showtimes.theater = :theater', { theater })
      .andWhere('showtimes.start_time < :endTime', { endTime })
      .andWhere('showtimes.end_time > :startTime', { startTime })
      .getCount();

    return count > 0;
  }

  async create(showtimeData: CreateShowtimeDto): Promise<Showtime> {
    const showtime = this.showtimeRepository.create(showtimeData);
    return this.showtimeRepository.save(showtime);
  }

  async update(showtimeId: number, updateData: Partial<Showtime>) {
    return this.showtimeRepository.update(showtimeId, updateData);
  }

  async delete(showtimeId: number) {
    return this.showtimeRepository.delete({ id: showtimeId });
  }
}
