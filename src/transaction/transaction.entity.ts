import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Index } from 'typeorm';
import { Bank } from '../bank/bank.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bank, (bank) => bank.IBAN, { nullable: false })
  bank: Bank;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  @Index()
  created: Date;
}