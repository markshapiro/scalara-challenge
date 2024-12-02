import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankModule } from './bank/bank.module';
import { TransactionModule } from './transaction/transaction.module';
import { UserModule } from './user/user.module';
import { WebhookModule } from './webhook/webhook.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    BankModule,
    TransactionModule,
    UserModule,
    WebhookModule,
  ],
})
export class AppModule {}