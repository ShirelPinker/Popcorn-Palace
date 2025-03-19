import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Showtime } from './showtime.entity';
import { CreateShowtimeDto } from './dtos/create-showtime.dto';
import { UpdateShowtimeDto } from './dtos/update-showtime.dto';

@Injectable()
export class ShowtimesService {
  constructor(
    @InjectRepository(Showtime)
    private showtimeRepository: Repository<Showtime>,
  ) {}

  async findOne(showtimeId: number): Promise<Showtime> {
    const showtime = await this.showtimeRepository.findOne({
      where: { id: showtimeId },
    });
    if (!showtime) {
      throw new Error('Showtime not found');
    }
    return showtime;
  }

  async create(showtimeData: CreateShowtimeDto): Promise<Showtime> {
    const showtime = this.showtimeRepository.create(showtimeData);
    return this.showtimeRepository.save(showtime);
  }

  async update(
    showtimeId: number,
    updateData: UpdateShowtimeDto,
  ): Promise<UpdateResult> {
    return this.showtimeRepository.update(showtimeId, updateData);
  }

  async delete(showtimeId: number): Promise<DeleteResult> {
    return this.showtimeRepository.delete({ id: showtimeId });
  }
}
