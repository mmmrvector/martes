import { Module, HttpModule } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ConfigModule } from '../../config/config.module';
import { RandomService } from '../utils/random.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, Album, Photo } from '../../database/entity';

@Module({
  imports: [
    ConfigModule.register({ folder: '/env/database' }),
    HttpModule,
    TypeOrmModule.forFeature([User, Album, Photo]),
  ],
  controllers: [ImageController],
  providers: [ImageService, RandomService],
  exports: [ImageService],
})
export class ImageModule {}
