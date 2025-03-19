import { Controller, Delete, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@Controller('/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('/all')
  getAllMovies(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Post()
  createMovie(@Body() movieData: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(movieData);
  }

  @Post('/update/:movieTitle')
  updateMovie(
    @Param('movieTitle') movieTitle: string,
    @Body() updateData: UpdateMovieDto,
  ) {
    return this.moviesService.update(movieTitle, updateData);
  }

  @Delete('/:movieTitle')
  deleteMovie(@Param('movieTitle') movieTitle: string) {
    return this.moviesService.delete(movieTitle);
  }
}
