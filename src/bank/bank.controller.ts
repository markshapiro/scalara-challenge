import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { BankService } from './bank.service';

@Controller('banks')
@ApiTags('Banks')
export class BankController {
  constructor(private readonly BankModuleService: BankService) {}

  @Get(':id')
  @ApiResponse({ status: 200 })
  async getBank(
    @Param('id') id: number
  ): Promise<any> {
    return await this.BankModuleService.findById(id);
  }

  @Get()
  @ApiResponse({ status: 200 })
  async getBanks(): Promise<any[]> {
    return await this.BankModuleService.listAll();
  }
}