import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Album } from './album.entity';

export enum Gender {
  MAN = 0,
  WOMAN = 1,
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  age: number;

  @Column({ type: 'enum', enum: Gender, default: Gender.MAN, width: 2 })
  gender: number;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ type: 'simple-array' })
  roles: string[];

  @Column({
    name: 'profile_picture',
    default: 'http://img-url.mrvector.cn/FoeFiF0N5g2AkzhOBD_QCft_oFjS',
  })
  profilePicture: string;
}
