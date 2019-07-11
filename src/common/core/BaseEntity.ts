import { BaseEntity as BaseEntityOrigin, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { classToPlain, Transform, Expose } from 'class-transformer';

export class BaseEntity extends BaseEntityOrigin {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  // 假刪除欄位
  @Expose({ groups: ['admin'] })
  @Column({
    name: 'trashed_at',
    type: 'timestamp',
    default: null,
  })
  @Transform(date => date && date.valueOf() || null)
  trashedAt: Date | null;

  @CreateDateColumn({ type: 'timestamp', name: 'created_date' })
  @Transform(date => date.valueOf())
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_date' })
  @Transform(date => date.valueOf())
  updatedDate: Date;

  toJSON() {
    return classToPlain(this);
  }
}
