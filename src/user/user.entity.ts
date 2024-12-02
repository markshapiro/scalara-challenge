import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable, Index } from 'typeorm';
import { Bank } from '../bank/bank.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  @Index()
  email: string;

  @ManyToMany(() => User)
  @JoinTable()
  friends: User[]

  @OneToMany(() => Bank, (Bank) => Bank.user)
  banks: Bank[]

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  maxLend: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({ type: "timestamptz", nullable: true })
  @Index()
  lastSync: Date;

  @Column({ type: "timestamptz", nullable: true })
  @Index()
  lastSyncMaxLend: Date;
}