import {
  Injectable,
  Logger,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from './article.interface';
import { ConfigService } from '../../config/config.service';
import * as qiniu from 'qiniu';
import { RandomService } from '../utils/random.service';
@Injectable()
export class ArticleService {
  private readonly logger = new Logger('Article');
  private readonly randomService = new RandomService();
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
    private readonly configService: ConfigService,
  ) {}

  async addArticle(article: Article): Promise<Article> {
    const createdArticle = new this.articleModel(article);
    return createdArticle.save();
  }

  async updateArticle(article: Article, id: string, user: any) {
    const originArticle = await this.articleModel.findById(id);
    if (user.userId !== originArticle.authorId)
      throw new HttpException('没有权限更新此文章', 403);
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

  async deleteArticle(user: any, id: string) {
    const article = await this.articleModel.findById(id);
    if (!user.roles.includes('admin') && user.userId !== article.authorId)
      throw new UnauthorizedException(403, '没有删除该文章的权限');
    const res = await this.articleModel.findByIdAndDelete(id);
    if (!res) throw new HttpException('删除失败', 403);
    return res;
  }
}
