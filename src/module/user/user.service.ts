import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './model/user.entity';
import { UserRepository } from './model/user.repository';

@Injectable()
export class UserService {
  private saltRounds = 10;

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getUserByID(id: string): Promise<User> {
    return this.userRepository.getUserByID(id);
  }

  async getUserByNicknameOrEmail({ nickname, email }): Promise<User> {
    const query = (nickname ? { nickname } : { email });
    return this.userRepository.findOneOrFail(query);
  }

  async getUserByNickname(nickname: string): Promise<User> {
    return (await this.userRepository.find({ nickname }))[0];
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.userRepository.getHash(createUserDto.password);
    const user = this.userRepository.create(createUserDto);
    return user.save();
  }

}
