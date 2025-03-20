import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Showtime } from './showtime.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowtimeDto } from './dtos/showtime.dto';

@Injectable()
export class ShowtimeRepository {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimeRepository: Repository<Showtime>,
  ) {}

  async getById(showtimeId: number): Promise<Showtime | null> {
    return this.showtimeRepository.findOneBy({ id: showtimeId });
  }

  async create(showtimeDto: ShowtimeDto): Promise<Showtime> {
    const showtime = this.showtimeRepository.create(showtimeDto);
    return this.showtimeRepository.save(showtime);
  }

  async update(
    showtimeId: number,
    updateShowtimeData: ShowtimeDto,
  ): Promise<UpdateResult> {
    return this.showtimeRepository.update(showtimeId, updateShowtimeData);
  }

  async delete(showtimeId: number): Promise<DeleteResult> {
    return this.showtimeRepository.delete({ id: showtimeId });
  }

  async getOverlappingShowtimes(
    theater: string,
    startTime: string,
    endTime: string,
    excludeShowtimeId?: number,
  ): Promise<Showtime[]> {
    const query = this.showtimeRepository
      .createQueryBuilder('showtimes')
      .where('showtimes.theater = :theater', { theater })
      .andWhere('showtimes.start_time < :endTime', { endTime })
      .andWhere('showtimes.end_time > :startTime', { startTime });

    if (excludeShowtimeId) {
      query.andWhere('showtimes.id != :excludeShowtimeId', {
        excludeShowtimeId,
      });
    }

    return query.getMany();
  }
}
