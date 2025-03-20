import { IsUUID, IsInt, IsPositive } from 'class-validator';

export class BookingDto {
  @IsInt()
  @IsPositive()
  showtimeId: number;

  @IsInt()
  @IsPositive()
  seatNumber: number;

  @IsUUID()
  userId: string;
}
