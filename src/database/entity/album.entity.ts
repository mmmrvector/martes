import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum TYPE {
  PUBLIC = 0,
  PRIVATE = 1,
}

@Entity('album')
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({})
  description: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'type', enum: TYPE, default: TYPE.PUBLIC, width: 2 })
  type: number;
}
