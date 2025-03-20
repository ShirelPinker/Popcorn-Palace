import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Showtime } from '../showtimes/showtime.entity';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  userId: string;

  @Column({ name: 'showtime_id' })
  showtimeId: number;

  @Column({ type: 'int', name: 'seat_number' })
  seatNumber: number;

  @ManyToOne(() => Showtime, (showtime) => showtime.bookings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'showtime_id' })
  showtime: Showtime;
}
