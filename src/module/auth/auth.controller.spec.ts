import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/model/user.entity';
import { UserService } from '../user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Auth Controller', () => {
  let controller: AuthController;

  class MockAuthService {
    createToken = () => 'jwt access token';
  }

  // tslint:disable-next-line:max-classes-per-file
  class MockUserService {
    createToken = () => 'jwt access token';
  }

  const mockRepository = {
    data: [
      //
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService, useClass: MockAuthService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
