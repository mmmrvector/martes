import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.interface';
@Injectable()
export class ArticleService {
  private readonly logger = new Logger('Article');
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
  ) {}

  async addArticle(article: Article): Promise<Article> {
    const createdArticle = new this.articleModel(article);
    return await createdArticle.save();
  }
}
