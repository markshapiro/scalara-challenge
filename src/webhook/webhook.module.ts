import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';

import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

import { Bank } from '../bank/bank.entity';
import { BankService } from '../bank/bank.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Bank])],
  providers: [UserService, BankService],
  controllers: [WebhookController],
  exports: [],
})
export class WebhookModule {}