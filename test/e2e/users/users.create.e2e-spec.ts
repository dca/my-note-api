
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from '../../../src/app.module';

describe('User', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    await app.init();
  });

  it(`/POST users`, async () => {
    const uid = `user${Math.random()}`;
    const record = {
      email: `${uid}@example.org`,
      nickname: uid,
      password: '123456',
      password_confirm: '123456',
    };
    const res = await request(app.getHttpServer())
      .post('/v1/user')
      .send(record);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('email', record.email);
    expect(res.body).toHaveProperty('nickname', record.nickname);
    expect(res.body).not.toHaveProperty('password');
  });

  afterAll(async () => {
    await app.close();
  });
});
