import {
  Column,
  Entity,
  Unique,
} from 'typeorm';

import { Exclude, Expose, Transform } from 'class-transformer';

import { BaseEntity } from '../../../common/core/BaseEntity';

@Entity()
@Unique('uq_email', ['email'])
@Unique('uq_nickname', ['nickname'])
export class User extends BaseEntity {

  @Column({
    type: 'varchar',
    nullable: true,
    length: 500,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 60,
  })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 50,
  })
  nickname: string;

  @Expose({ groups: ['admin'] })
  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
  })
  resetPwdToken: string;

  @Expose({ groups: ['admin'] })
  @Column({ type: 'timestamp', nullable: true })
  updatePwdExpire: Date;

  @Expose({ groups: ['admin'] })
  @Column({ type: 'tinyint', default: 0 })
  isEmailVerify: number;

}
