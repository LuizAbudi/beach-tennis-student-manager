import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionPlanService } from './subscriptionPlans.service';
import { SubscriptionPlanController } from './subscriptionPlans.controller';
import { SubscriptionPlan } from 'src/entities/subscriptionPlan/subscriptionPlan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPlan])],
  providers: [SubscriptionPlanService],
  controllers: [SubscriptionPlanController],
  exports: [SubscriptionPlanService],
})
export class SubscriptionPlanModule {}
