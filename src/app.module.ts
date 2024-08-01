import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from 'config/configuration';
import { StudentsModule } from './api/students/students.module';
import { TeachersModule } from './api/teachers/teachers.module';
import { ScheduleModule } from './api/schedule/schedule.module';
import { SeedService } from './seed/seed.service';

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
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [AppService, SeedService],
})
export class AppModule {}
