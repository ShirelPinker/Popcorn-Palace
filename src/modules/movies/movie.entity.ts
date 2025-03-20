import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Showtime } from '../showtimes/showtime.entity';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true }) // Ensures uniqueness since we use the title as identifier for Update and Delete
  title: string;

  @Column()
  genre: string;

  @Column()
  duration: number;

  @Column({ type: 'decimal', precision: 3, scale: 1 })
  rating: number;

  @Column({ name: 'release_year' })
  releaseYear: number;

  @OneToMany(() => Showtime, (showtime) => showtime.movie, { cascade: true })
  showtimes: Showtime[];
}
