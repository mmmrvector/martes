import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './article.model';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
    ConfigModule.register({ folder: '/env/database' }),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
