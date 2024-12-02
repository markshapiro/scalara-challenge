import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly UserModuleService: UserService) {}

  @Get(':id')
  @ApiResponse({ status: 200 })
  async getUser(
    @Param('id') id: number
  ): Promise<any> {
    return await this.UserModuleService.findById(id);
  }

  @Get(':id/max-lend')
  @ApiResponse({ status: 200 })
  async getMaxLend(
    @Param('id') id: number
  ): Promise<any> {
    return await this.UserModuleService.getMaxLend(id);
  }

  @Get()
  @ApiResponse({ status: 200 })
  async getUsers(): Promise<any[]> {
    return await this.UserModuleService.listAll();
  }
}