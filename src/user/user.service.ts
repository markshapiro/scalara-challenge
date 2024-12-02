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
      UPDATE "user" u_upd SET
        balance = tmp.balance,
        "lastSync" = CURRENT_TIMESTAMP
      FROM (
          SELECT tmp.id, SUM(tmp.balance) AS balance FROM 
          (
              SELECT distinct on (b.id) u.id AS id, b."balance" AS balance
              FROM "user" u
              JOIN "bank" b_existing ON b_existing."userId" = u.id
              JOIN "bank" b ON b."userId" = u.id
              WHERE
                b_existing."lastSync" IS NOT NULL
                AND (u."lastSync" IS NULL OR b_existing."lastSync" > u."lastSync")
          ) AS tmp
          GROUP BY tmp.id
      ) AS tmp(id, balance) 
      WHERE tmp.id = u_upd.id
    `);
  }

  async syncMaxLend(): Promise<null> {
    return await this.userRepository.query(`
      
      UPDATE "user" u_upd SET
        "maxLend" = tmp.maxLend,
        "lastSyncMaxLend" = CURRENT_TIMESTAMP
      FROM (
        SELECT
          u1.id AS id, SUM(GREATEST(u2.balance - u1.balance, 0)) AS maxLend
        FROM "user" u1
        JOIN "user_friends_user" f ON u1."id" = f."userId_1"
        JOIN "user" u2 ON u2."id" = f."userId_2"
        GROUP BY u1.id
      ) AS tmp(id, maxLend) 
      WHERE tmp.id = u_upd.id
    `);
  }
}