import { IsUUID, IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class BookingDto {
  @IsInt()
  @IsNotEmpty({ message: 'Showtime id should not be empty' })
  showtimeId: number;

  @IsInt()
  @IsPositive({ message: 'Seat number must be a positive number' })
  seatNumber: number;

  @IsUUID()
  @IsNotEmpty({ message: 'User id should not be empty' })
  userId: string;
}
