import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { ShowtimeDto } from './dtos/showtime.dto';
import { Showtime } from './showtime.entity';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private showtimesService: ShowtimesService) {}

  @Get('/:showtimeId')
  async getShowtime(
    @Param('showtimeId', ParseIntPipe) showtimeId: number,
  ): Promise<Showtime> {
    return this.showtimesService.getById(showtimeId);
  }

  @Post()
  async createShowtime(@Body() showtimeDto: ShowtimeDto): Promise<Showtime> {
    return this.showtimesService.create(showtimeDto);
  }

  @Post('/update/:showtimeId')
  async updateShowtime(
    @Param('showtimeId', ParseIntPipe) showtimeId: number,
    @Body() showtimeDto: ShowtimeDto,
  ): Promise<void> {
    await this.showtimesService.update(showtimeId, showtimeDto);
    return;
  }

  @Delete('/:showtimeId')
  async deleteShowtime(
    @Param('showtimeId', ParseIntPipe) showtimeId: number,
  ): Promise<void> {
    await this.showtimesService.delete(showtimeId);
    return;
  }
}
