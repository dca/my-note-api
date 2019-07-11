import * as bcrypt from 'bcrypt';

import { EntityRepository, Repository } from 'typeorm';

import { BaseRepository } from '../../../common/core/BaseRepository';
import { CreateTokenDto } from '../../auth/dto/create-token.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  private saltRounds = 10;

  async getUserByID(id: string): Promise<User> {
    return await this.findOne(id);
  }

  async checkPassword(createTokenDto: CreateTokenDto): Promise<User | null> {
    const query = createTokenDto.email ? { email: createTokenDto.email } : { nickname: createTokenDto.nickname };
    // find user by email or nickname
    const user = await this.findOne(query);
    if (!user) { return null; }

    const isPassed = await this.compareHash(createTokenDto.password, user.password);
    return isPassed ? user : null;
  }

  async getHash(password: string|undefined): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compareHash(password: string|undefined, hash: string|undefined): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
