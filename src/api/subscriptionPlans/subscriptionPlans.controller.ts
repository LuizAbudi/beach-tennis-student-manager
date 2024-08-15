import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubscriptionPlanService } from './subscriptionPlans.service';
import { CreateSubscriptionPlanDto } from './dto/create-plans.dto';

@ApiTags('SubscriptionPlan')
@Controller('subscriptionPlan')
export class SubscriptionPlanController {
  constructor(
    private readonly subscriptionPlanService: SubscriptionPlanService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all subscription plans' })
  @ApiResponse({ status: 200, description: 'Subscription plans retrieved' })
  @ApiResponse({ status: 404, description: 'Subscription plans not retrieved' })
  async getSubscriptionPlans() {
    return this.subscriptionPlanService.getSubscriptionPlans();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subscription plan by id' })
  @ApiResponse({ status: 200, description: 'Subscription plan retrieved' })
  @ApiResponse({ status: 404, description: 'Subscription plan not retrieved' })
  async getSubscriptionPlanById(id: number) {
    return this.subscriptionPlanService.getSubscriptionPlanById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create subscription plan' })
  @ApiResponse({ status: 200, description: 'Subscription plan created' })
  @ApiResponse({ status: 404, description: 'Subscription plan not created' })
  async createSubscriptionPlan(
    @Body('createSubscriptionPlanDto')
    createSubscriptionPlanDto: CreateSubscriptionPlanDto,
  ) {
    return this.subscriptionPlanService.createSubscriptionPlan(
      createSubscriptionPlanDto,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update subscription plan' })
  @ApiResponse({ status: 200, description: 'Subscription plan updated' })
  @ApiResponse({ status: 404, description: 'Subscription plan not updated' })
  async updateSubscriptionPlan(
    @Body('updateSubscriptionPlanDto')
    updateSubscriptionPlanDto: CreateSubscriptionPlanDto,
    id: number,
  ) {
    return this.subscriptionPlanService.updateSubscriptionPlan(
      id,
      updateSubscriptionPlanDto,
    );
  }
}
