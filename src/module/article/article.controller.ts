import {
  Controller,
  Post,
  Body,
  Logger,
  UseGuards,
  Get,
  Query,
  Param,
  Delete,
  Req,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.interface';
import { Roles } from '../../decorator/roles.decorator';
import { RolesGuard } from '../../guard/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  /**
   * Note:
   * 1. @UseGuards()有执行顺序，由于在jwt验证过程中会添加角色，并将user对象绑定到Request上去，
   *    因此必须先进行jwt校验，再进行角色校验
   *
   * 添加一篇文章
   * @param article 文章内容
   */
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  addArticle(@Body() article: Article) {
    return this.articleService.addArticle(article);
  }

  @Post(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateArticle(
    @Req() req: any,
    @Body() article: Article,
    @Param('id') id: string,
  ) {
    const user = req.user;
    return this.articleService.updateArticle(article, id, user);
  }
  /**
   * 根据文章标题查找文章列表
   * @param {string} title 文章标题
   */
  @Get()
  findArticlesByTitle(
    @Query('title') title: string,
    @Query('p') pageNum: number,
    @Query('ps') pageSize: number,
  ) {
    return this.articleService.findArticlesByTitle(title, pageNum, pageSize);
  }

  /**
   * 获取文章列表
   * @param pageNum 页数
   * @param pageSize 每页数据数
   */
  @Get('all')
  findArticles(@Query('p') pageNum: number, @Query('ps') pageSize: number) {
    return this.articleService.findArticles(pageNum, pageSize);
  }

  /**
   * 根据文章id查找文章
   * @param id 文章id
   */
  @Get(':id')
  findArticleById(@Param('id') id: string) {
    return this.articleService.findArticleById(id);
  }

  @Roles('user', 'admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  deleteArticle(@Req() req: any, @Param('id') id: string) {
    const user = req.user;
    return this.articleService.deleteArticle(user, id);
  }
}
