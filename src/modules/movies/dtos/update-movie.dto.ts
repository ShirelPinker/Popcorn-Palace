import { IsString, IsNumber, Min, Max } from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  title: string;

  @IsString()
  genre: string;

  @IsNumber()
  @Min(1)
  duration: number; // in minutes

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number; // out of 10

  @IsNumber()
  @Min(1888) // First movie ever made was in 1888
  releaseYear: number;
}
