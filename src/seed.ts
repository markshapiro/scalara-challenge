import { User } from './user/user.entity';
import { Bank } from './bank/bank.entity';
import { Transaction } from './transaction/transaction.entity';

export async function seed(dataSource){
  
  const userRepository = dataSource.getRepository(User);
  const bankRepository = dataSource.getRepository(Bank);
  const txRepository = dataSource.getRepository(Transaction);

  var users = await userRepository.find({})
  if(users.length===0){

    const u1 = await userRepository.save({
      name:"user1",
      email:"user1@user1.com",
    });

    const u2 = await userRepository.save({
      name:"user2",
      email:"user2@user2.com",
    });

    const u3 = await userRepository.save({
      name:"user3",
      email:"user3@user3.com",
    });

    addFriend(userRepository, u1.id, u2.id)
    addFriend(userRepository, u1.id, u3.id)

    const b11 = await bankRepository.save({
      IBAN:"1.1",
      user:u1,
    });

    const b21 = await bankRepository.save({
      IBAN:"2.1",
      user:u2,
    });

    await bankRepository.save({
      IBAN:"2.2",
      user:u2,
    });

    await bankRepository.save({
      IBAN:"2.3",
      user:u3,
    });

    await bankRepository.save({
      IBAN:"3.1",
      user:u3,
    });

    await txRepository.save({
      bank:b11,
      amount:100,
    });

    await txRepository.save({
      bank:b11,
      amount:-20,
    });
    await txRepository.save({
      bank:b11,
      amount:110,
    });
    await txRepository.save({
      bank:b21,
      amount:80,
    });
    await txRepository.save({
      bank:b11,
      amount:150,
    });
    await txRepository.save({
      bank:b21,
      amount:110,
    });

  }
}

async function addFriend(userRepository, userId: number, friendId: number): Promise<void> {
  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ['friends'],
  });
  const friend = await userRepository.findOne({
    where: { id: friendId },
    relations: ['friends'],
  });

  if (!user || !friend) {
    throw new Error('User or friend not found');
  }

  if (!user.friends.some((f) => f.id === friend.id)) {
    user.friends.push(friend);
  }
  if (!friend.friends.some((f) => f.id === user.id)) {
    friend.friends.push(user);
  }

  await userRepository.save([user, friend]);
}