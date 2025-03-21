import { Controller, Delete, Get, Post, Body, Param, HttpCode } from "@nestjs/common";
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
  @HttpCode(200)
  createMovie(@Body() movieDto: MovieDto): Promise<Movie> {
    return this.moviesService.create(movieDto);
  }

  @Post('/update/:movieTitle')
  @HttpCode(200)
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
