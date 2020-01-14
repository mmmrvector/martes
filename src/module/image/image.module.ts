import { Module, HttpModule } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ConfigModule } from '../../config/config.module';
import { RandomService } from '../utils/random.service';

@Module({
  imports: [ConfigModule.register({ folder: '/env/database' }), HttpModule],
  controllers: [ImageController],
  providers: [ImageService, RandomService],
  exports: [ImageService],
})
export class ImageModule {}
