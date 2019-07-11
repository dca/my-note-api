import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/model/user.entity';
import { UserRepository } from '../user/model/user.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async createToken(user: User) {
    const payload: JwtPayload = { id: user.id, email: user.email, nickname: user.nickname };
    const accessToken = this.jwtService.sign(payload);
    return {
      expiresIn: 86400,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userRepository.getUserByID(payload.id);
  }
}
