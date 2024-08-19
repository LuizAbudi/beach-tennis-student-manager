import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
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
  async getSubscriptionPlans() {
    return this.subscriptionPlanService.getSubscriptionPlans();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subscription plan by id' })
  @ApiResponse({ status: 200, description: 'Subscription plan retrieved' })
  async getSubscriptionPlanById(@Param('id') id: number) {
    return this.subscriptionPlanService.getSubscriptionPlanById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create subscription plan' })
  @ApiResponse({ status: 201, description: 'Subscription plan created' })
  async createSubscriptionPlan(
    @Body() createSubscriptionPlanDto: CreateSubscriptionPlanDto,
  ) {
    return this.subscriptionPlanService.createSubscriptionPlan(
      createSubscriptionPlanDto,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update subscription plan' })
  @ApiResponse({ status: 200, description: 'Subscription plan updated' })
  async updateSubscriptionPlan(
    @Param('id') id: number,
    @Body() updateSubscriptionPlanDto: CreateSubscriptionPlanDto,
  ) {
    return this.subscriptionPlanService.updateSubscriptionPlan(
      id,
      updateSubscriptionPlanDto,
    );
  }
}
