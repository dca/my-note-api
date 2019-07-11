import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './model/user.entity';
import { UserController } from './controller/user.controller';
import { UserRepository } from './model/user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserRepository,
    ]),
    AuthModule,
  ],
  providers: [
    UserService,
  ],
  controllers: [
    UserController,
  ],
})
export class UserModule {}
