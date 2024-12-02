import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './bank.entity';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank)
    private readonly bankRepository: Repository<Bank>,
  ) {}

  async findById(id: number): Promise<any> {
    return this.bankRepository.findOne({
      relations: {
        user: true,
      },
    where: { id }
    });
  }

  async listAll(): Promise<any[]> {
    return this.bankRepository.find({
      relations: {
        user: true,
      },
    });
  }

  async syncBalance(): Promise<null> {
    return await this.bankRepository.query(`
      UPDATE bank b_upd SET
        balance = b_upd.balance + tmp.balance,
        "lastSync" = CURRENT_TIMESTAMP
      FROM (
        SELECT b.id AS id, SUM(COALESCE(tx."amount", 0)) AS balance FROM bank b
        LEFT JOIN "transaction" tx ON tx."bankId" = b.id
        WHERE tx."created" > b."lastSync" OR b."lastSync" IS NULL
        GROUP BY b.id
      ) AS tmp(id, balance) 
      WHERE tmp.id = b_upd.id
    `);
  }
}