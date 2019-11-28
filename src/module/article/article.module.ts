import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from './article.model';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
