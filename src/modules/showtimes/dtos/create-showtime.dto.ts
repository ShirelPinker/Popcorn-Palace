import { IsString, IsNumber, IsDateString } from 'class-validator';

export class CreateShowtimeDto {
  @IsNumber()
  movieId: number;

  @IsNumber()
  price: number;

  @IsString()
  theater: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
