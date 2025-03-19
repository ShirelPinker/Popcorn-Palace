import { Controller, Delete, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@Controller('/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('/all')
  async getAllMovies(): Promise<Movie[]> {
    return await this.moviesService.findAll();
  }

  @Post()
  async createMovie(@Body() movieData: CreateMovieDto): Promise<Movie> {
    return await this.moviesService.create(movieData);
  }

  @Post('/update/:movieTitle')
  async updateMovie(
    @Param('movieTitle') movieTitle: string,
    @Body() updateData: UpdateMovieDto,
  ) {
    return await this.moviesService.update(movieTitle, updateData);
  }

  @Delete('/:movieTitle')
  async deleteMovie(@Param('movieTitle') movieTitle: string) {
    return await this.moviesService.delete(movieTitle);
  }
}
