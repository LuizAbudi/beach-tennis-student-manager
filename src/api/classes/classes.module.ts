import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [ClassesService],
  controllers: [ClassesController],
  exports: [ClassesService],
})
export class PaymentModule {}
