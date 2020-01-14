import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Photo } from './photo.entity';

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

  @ManyToOne(
    type => User,
    user => user.albums,
  )
  user: User;

  @OneToMany(
    type => Photo,
    photo => photo.album,
  )
  photos: Photo[];
}
