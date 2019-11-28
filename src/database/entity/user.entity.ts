import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Gender {
  MAN = 0,
  WOMAN = 1,
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_name' })
  username: string;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: Gender, default: Gender.MAN, width: 2 })
  gender: number;

  @Column()
  password: string;
}
