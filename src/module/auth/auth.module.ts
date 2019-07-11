import * as config from 'config';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/model/user.entity';
import { UserRepository } from '../user/model/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserRepository]),

    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
    }),
    JwtModule.register({
      secretOrPrivateKey: config.get('jwtSecret'),
      signOptions: {
        expiresIn: 86400,
      },
    }),
    // forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
