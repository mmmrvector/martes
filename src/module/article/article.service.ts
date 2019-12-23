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
    return createdArticle.save();
  }

  async findArticlesByTitle(title: string, pageNum: number, pageSize: number) {
    const article = this.articleModel
      .find({ title })
      .limit(parseInt(String(pageSize), 10))
      .skip((pageNum - 1) * pageSize);
    return article;
  }

  async findArticleById(id: string) {
    const article = this.articleModel.findById(id);
    return article;
  }

  async findArticles(pageNum: number, pageSize: number) {
    const articles = this.articleModel
      .find()
      .limit(parseInt(String(pageSize), 10))
      .skip((pageNum - 1) * pageSize);
    return articles;
  }
}
