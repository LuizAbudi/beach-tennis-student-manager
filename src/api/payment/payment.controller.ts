import {
  Controller,
  Put,
  Body,
  Param,
  NotFoundException,
  Get,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PaymentService } from './payment.service';
import {
  UpdatePaymentDateDto,
  UpdatePaymentStatusDto,
} from './dto/update-payment.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from 'src/entities/payment/payment.entity';
import { QueryParamsDto } from './dto/query-params.dto';

@ApiTags('Payments')
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post(':studentId/create-payment')
  @ApiOperation({ summary: 'Create Payment for a Student' })
  @ApiResponse({ status: 201, description: 'Payment Created' })
  @ApiResponse({ status: 404, description: 'Student not found' })
  async createPayment(
    @Param('studentId') studentId: number,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    return this.paymentService.createPayment(studentId, createPaymentDto);
  }

  @Put(':studentId/update-payment-date')
  @ApiOperation({ summary: 'Update Payment Date for a Student' })
  @ApiResponse({ status: 200, description: 'Payment Date Updated' })
  @ApiResponse({ status: 404, description: 'Payment or Student not found' })
  async updatePaymentDate(
    @Param('studentId') studentId: number,
    @Body() updatePaymentDto: UpdatePaymentDateDto,
  ) {
    try {
      await this.paymentService.updatePaymentDate(
        studentId,
        updatePaymentDto.paymentDate,
      );
      return { message: 'Payment Date Updated Successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Put(':studentId/update-payment-status')
  @ApiOperation({ summary: 'Update Payment Status for a Student' })
  @ApiResponse({ status: 200, description: 'Payment Status Updated' })
  @ApiResponse({ status: 404, description: 'Payment or Student not found' })
  async updatePaymentStatus(
    @Param('studentId') studentId: number,
    @Body() updatePaymentDto: UpdatePaymentStatusDto,
  ) {
    try {
      await this.paymentService.updatePaymentStatus(
        studentId,
        updatePaymentDto.paymentStatus,
      );
      return { message: 'Payment Status Updated Successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Get(':studentId/payment')
  @ApiOperation({ summary: 'Get Payment Details for a Student' })
  @ApiResponse({ status: 200, description: 'Payment Details' })
  @ApiResponse({ status: 404, description: 'Payment or Student not found' })
  async getPaymentDetails(@Param('studentId') studentId: number) {
    try {
      const payment = await this.paymentService.getStudentPayment(studentId);
      return payment;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @ApiOperation({ summary: 'Get All Payments' })
  @ApiResponse({ status: 200, description: 'All Payments' })
  @Get()
  async getAllPayments(
    @Query(new ValidationPipe({ transform: true })) query: QueryParamsDto,
  ): Promise<{ items: Payment[]; total: number }> {
    return this.paymentService.getAllPayments(query);
  }
}
