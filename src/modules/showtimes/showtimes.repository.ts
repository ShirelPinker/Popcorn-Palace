import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Showtime } from './showtime.entity';

@Injectable()
export class ShowtimeRepository extends Repository<Showtime> {
  constructor(private dataSource: DataSource) {
    super(Showtime, dataSource.createEntityManager());
  }

  async getById(showtimeId: number): Promise<Showtime | null> {
    return this.findOne({ where: { id: showtimeId } });
  }

  async isShowtimeOverlapping(
    theater: string,
    startTime: string,
    endTime: string,
  ): Promise<boolean> {
    const count = await this.createQueryBuilder('showtimes')
      .where('showtimes.theater = :theater', { theater })
      .andWhere('showtimes.start_time < :endTime', { endTime })
      .andWhere('showtimes.end_time > :startTime', { startTime })
      .getCount();

    return count > 0;
  }

  async saveShowtime(showtime: Showtime): Promise<Showtime> {
    return this.save(showtime);
  }

  async updateShowtime(showtimeId: number, updateData: Partial<Showtime>) {
    return this.update(showtimeId, updateData);
  }

  async deleteShowtime(showtimeId: number) {
    return this.delete({ id: showtimeId });
  }
}
