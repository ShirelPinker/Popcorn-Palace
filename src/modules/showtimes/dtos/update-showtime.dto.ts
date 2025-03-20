import { IsString, IsNumber, IsOptional, IsDateString } from 'class-validator';

export class UpdateShowtimeDto {
  @IsOptional()
  @IsNumber()
  movieId?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  theater?: string;

  @IsOptional()
  @IsDateString()
  startTime?: Date;

  @IsOptional()
  @IsDateString()
  endTime?: Date;
}
