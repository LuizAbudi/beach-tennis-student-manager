import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlanService } from './subscriptionPlans.service';
import { SubscriptionPlanController } from './subscriptionPlans.controller';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [SubscriptionPlanService],
  controllers: [SubscriptionPlanController],
  exports: [SubscriptionPlanService],
})
export class SubscriptionPlanModule {}
