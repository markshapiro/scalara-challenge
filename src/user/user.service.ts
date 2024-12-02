import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
// import { CreateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
  async findById(id: number): Promise<any> {
    return this.userRepository.findOne({
      relations: {
        friends: true,
      },
      where: { id }
    });
  }

  async getMaxLend(id: number): Promise<any> {
    return this.userRepository.findOne({
      select: {
        maxLend: true,
    },
      where: { id }
    });
  }

  async listAll(): Promise<any[]> {
    return this.userRepository.find({
      relations: {
        friends: true,
      },
    });
  }

  async syncBalance(): Promise<null> {
    return await this.userRepository.query(`
      UPDATE "user" uu SET
        balance = uu.balance + tmp.balance,
        "lastSync" = CURRENT_TIMESTAMP
      FROM (
        SELECT uu.id AS id, sum(b."balance") AS balance FROM "user" uu
        JOIN "bank" b ON b."userId" = uu.id
        WHERE b."lastSync" > uu."lastSync" OR uu."lastSync" IS NULL
        GROUP BY uu.id
      ) AS tmp(id, balance) 
      WHERE tmp.id = uu.id
    `);
  }

  async syncMaxLend(): Promise<null> {
    return await this.userRepository.query(`
      UPDATE "user" uu SET
        maxLend = uu.maxLend,
        "lastSyncMaxLend" = CURRENT_TIMESTAMP
      FROM (
        SELECT
          u1.id AS id, SUM(u2.balance - u1.balance) AS maxLend
        FROM "user" u1
        JOIN "user_friends_user" f ON u1."id" = f."userId_1"
        JOIN "user" u2 ON u2."id" = f."userId_2"
        WHERE u2.balance > u1.balance
        GROUP BY u1.id
      ) AS tmp(id, maxLend) 
      WHERE tmp.id = uu.id
    `);

    //AND u2."lastSync" > u1."lastSyncMaxLend" OR u1."lastSyncMaxLend" IS NULL
  }
}