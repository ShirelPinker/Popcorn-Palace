import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class MovieDto {
  @IsString()
  @IsNotEmpty({ message: 'Title should not be empty' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Genre should not be empty' })
  genre: string;

  @IsNumber()
  @IsPositive({ message: 'Duration must be a positive number' })
  duration: number;

  @IsNumber()
  @IsPositive({ message: 'Rating must be a positive number' })
  @Max(10)
  rating: number;

  @IsNumber()
  @Min(1700, { message: 'Release year must be greater than or equal to 1700' })
  releaseYear: number;
}
