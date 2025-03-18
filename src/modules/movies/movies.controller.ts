import { Controller, Delete, Get, Post, Body, Param } from '@nestjs/common';
import { CreateMovieDto } from './createMovie.dto';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

@Controller('/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get('/all')
  async getAllMovies(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Post()
  async createMovie(@Body() movieData: CreateMovieDto): Promise<Movie> {
    return this.moviesService.create(movieData);
  }

  @Post('/update/:movieTitle')
  updateMovie(
    @Param('movieTitle') movieTitle: string,
    @Body() updateData: any,
  ) {
    console.log(movieTitle);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: string) {
    console.log(id);
  }
}
