import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Album } from './album.entity';

@Entity('photo')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  description: string;

  @ManyToOne(
    type => Album,
    album => album.photos,
  )
  album: Album;
}
