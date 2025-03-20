import { IsString, IsNumber, Min, Max } from 'class-validator';

export class MovieDto {
  @IsString()
  title: string;

  @IsString()
  genre: string;

  @IsNumber()
  @Min(0)
  duration: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  rating: number;

  @IsNumber()
  @Min(1700)
  releaseYear: number;
}
