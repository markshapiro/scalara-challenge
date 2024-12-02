import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { CreateTxDto } from './transaction.dto';

@Controller('transactions')
@ApiTags('Transactions')
export class TransactionController {
  constructor(private readonly TransactionModuleService: TransactionService) {}

  @Get(':id')
  @ApiResponse({ status: 200 })
  async getTransaction(
    @Param('id') id: number
  ): Promise<any> {
    return await this.TransactionModuleService.findById(id);
  }

  @Get()
  @ApiResponse({ status: 200 })
  async getTransactions(): Promise<any[]> {
    return await this.TransactionModuleService.listAll();
  }

  @Post()
  @ApiBody({ type: CreateTxDto })
  @ApiResponse({ status: 201, description: 'success' })
  async createTransaction(
    @Body() body: CreateTxDto,
  ): Promise<{ message: string }> {
    await this.TransactionModuleService.createTx(body);
    return { message: 'success' };
  }
}