import { Controller, Patch, Body } from '@nestjs/common';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { UserService } from '../user/user.service';
import { BankService } from '../bank/bank.service';

import { RunProcessDto } from './webhook.dto';

import fetch from 'node-fetch';

@Controller('webhooks')
@ApiTags('Webhooks')
export class WebhookController {
  constructor(private readonly UserModuleService: UserService, private readonly BankModuleService: BankService) {}

  @Patch('run-processes')
  @ApiBody({ type: RunProcessDto })
  async webhook(
    @Body() body: RunProcessDto,
  ): Promise<null> {

    setTimeout(async () => {

      let result = {};

      try {
        if(body.process_id>=1){
          await this.BankModuleService.syncBalance()
        }
        if(body.process_id>=2){
          await this.UserModuleService.syncBalance()
        }
        if(body.process_id>=3){
          await this.UserModuleService.syncMaxLend()
        }

        result = {message:"success"}
      } catch(e){
        result = {message:e.toString()}
      }

      try {
        await fetch(body.url, {
          method: 'post',
          body: JSON.stringify(body),
          headers: {'Content-Type': 'application/json'}
        });
      } catch(e){
        console.log("error:",e.toString())
      }

     
    })

    return null
  }
}