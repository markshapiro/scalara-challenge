import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { CreateTxDto } from './transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async findById(id: number): Promise<any> {
    return this.transactionRepository.findOne({
    where: { id },
    relations: { bank: true }
    });
  }

  async listAll(): Promise<any[]> {
    return this.transactionRepository.find({
      relations: { bank: true }
    });
  }

  
  async createTx(transaction: CreateTxDto): Promise<any> {
    return await this.transactionRepository
    .createQueryBuilder()
    .insert()
    .into(Transaction)
    .values({
      amount: transaction.amount,
      bank: () => `(SELECT id FROM bank WHERE "IBAN" = :sourceIban)`,
    })
    .setParameters({ sourceIban:transaction.IBAN })
    .execute();
  }

}