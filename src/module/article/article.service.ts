import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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

  async updateArticle(article: Article, id: string) {
    const updateArticle = await this.articleModel.findByIdAndUpdate(
      id,
      article,
    );
    return updateArticle;
  }

  async findArticlesByTitle(title: string, pageNum: number, pageSize: number) {
    const article = this.articleModel
      .find({ title })
      .limit(parseInt(String(pageSize), 10))
      .skip((pageNum - 1) * pageSize);
    return article;
  }

  // TODO catch exception when id is not useful
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
