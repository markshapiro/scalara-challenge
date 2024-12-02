import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Index } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @Index()
  IBAN: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;

  @Column({ nullable: false, type: 'decimal', precision: 10, scale: 2, default: 0 })
  balance: number;

  @Column({ type: "timestamptz", nullable: true })
  @Index()
  lastSync: Date;
}