import {
  IsString,
  IsNumber,
  IsDateString,
  IsPositive,
  IsNotEmpty,
} from 'class-validator';

export class ShowtimeDto {
  @IsNumber()
  movieId: number;

  @IsNumber()
  @IsPositive({ message: 'Price must be a positive number' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'Theater should not be empty' })
  theater: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
