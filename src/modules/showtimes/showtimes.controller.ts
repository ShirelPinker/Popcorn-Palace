import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dtos/create-showtime.dto';
import { Showtime } from './showtime.entity';
import { UpdateShowtimeDto } from './dtos/update-showtime.dto';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Get('/:showtimeId')
  async getShowtime(
    @Param('showtimeId') showtimeId: string,
  ): Promise<Showtime> {
    return this.showtimesService.findOne(Number(showtimeId));
  }

  @Post()
  async createShowtime(
    @Body() showtimeData: CreateShowtimeDto,
  ): Promise<Showtime> {
    return this.showtimesService.create(showtimeData);
  }

  @Post('/update/:showtimeId')
  async updateMovie(
    @Param('showtimeId') showtimeId: string,
    @Body() updateData: UpdateShowtimeDto,
  ) {
    return this.showtimesService.update(Number(showtimeId), updateData);
  }

  @Delete('/:showtimeId')
  async deleteMovie(@Param('showtimeId') showtimeId: string) {
    return this.showtimesService.delete(Number(showtimeId));
  }
}
