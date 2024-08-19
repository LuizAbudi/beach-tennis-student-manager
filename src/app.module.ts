import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { PaymentModule } from './api/payment/payment.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from 'config/configuration';
import { StudentsModule } from './api/students/students.module';
import { TeachersModule } from './api/teachers/teachers.module';
import { SeedService } from './seed/seed.service';
import { SubscriptionPlanModule } from './api/subscriptionPlans/subscriptionPlans.module';
import { ClassesModule } from './api/classes/classes.module';

@Module({
  imports: [
    // Load env variables from configuration file
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),

    // Connect to database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('database'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),

    // Import modules
    AuthModule,
    UsersModule,
    StudentsModule,
    TeachersModule,
    PaymentModule,
    SubscriptionPlanModule,
    ClassesModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
