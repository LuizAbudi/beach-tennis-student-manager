import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubscriptionPlanDto } from './dto/create-plans.dto';
import { SubscriptionPlan } from 'src/entities/subscriptionPlan/subscriptionPlan.entity';

@Injectable()
export class SubscriptionPlanService {
  constructor(
    @InjectRepository(SubscriptionPlan)
    private readonly subscriptionPlanRepository: Repository<SubscriptionPlan>,
  ) {}

  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return this.subscriptionPlanRepository.find();
  }

  async getSubscriptionPlanById(
    subscriptionPlanId: number,
  ): Promise<SubscriptionPlan> {
    return this.subscriptionPlanRepository.findOneBy({
      id: subscriptionPlanId,
    });
  }

  async createSubscriptionPlan(
    createSubscriptionPlanDto: CreateSubscriptionPlanDto,
  ): Promise<SubscriptionPlan> {
    return this.subscriptionPlanRepository.save(createSubscriptionPlanDto);
  }

  async updateSubscriptionPlan(
    subscriptionPlanId: number,
    updateSubscriptionPlanDto: CreateSubscriptionPlanDto,
  ): Promise<SubscriptionPlan> {
    const subscriptionPlanToUpdate =
      await this.subscriptionPlanRepository.findOneBy({
        id: subscriptionPlanId,
      });
    if (!subscriptionPlanToUpdate) {
      throw new NotFoundException(
        `SubscriptionPlan with id ${subscriptionPlanId} not found`,
      );
    }
    return this.subscriptionPlanRepository.save({
      ...subscriptionPlanToUpdate,
      ...updateSubscriptionPlanDto,
    });
  }
}
