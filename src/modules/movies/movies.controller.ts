import { Controller, Delete, Get, Post, Body, Param } from '@nestjs/common';
import { MovieDto } from './dtos/movie.dto';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  @Get('/all')
  getMovies(): Promise<Movie[]> {
    return this.moviesService.findAll();
  }

  @Post()
  createMovie(@Body() movieDto: MovieDto): Promise<Movie> {
    return this.moviesService.create(movieDto);
  }

  @Post('/update/:movieTitle')
  updateMovie(
    @Param('movieTitle') movieTitle: string,
    @Body() movieDto: MovieDto,
  ) {
    return this.moviesService.update(movieTitle, movieDto);
  }

  @Delete('/:movieTitle')
  deleteMovie(@Param('movieTitle') movieTitle: string) {
    return this.moviesService.delete(movieTitle);
  }
}
