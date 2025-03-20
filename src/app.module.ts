import { Module } from '@nestjs/common';
import { MoviesModule } from './modules/movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './database/database.config';
import { ShowtimesModule } from './modules/showtimes/showtimes.module';
import { BookingModule } from './modules/bookings/booking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MoviesModule,
    ShowtimesModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
