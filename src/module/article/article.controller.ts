import {
  Controller,
  Post,
  Body,
  Logger,
  UseGuards,
  Get,
  Query,
  Param,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { Article } from './article.interface';
import { Roles } from '../../decorator/roles.decorator';
import { RolesGuard } from '../../guard/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('article')
export class ArticleController {
  private readonly logger = new Logger('article');
  constructor(private readonly articleService: ArticleService) {}

  /**
   * Note:
   * 1. @UseGuards()有执行顺序，由于在jwt验证过程中会添加角色，并将user对象绑定到Request上去，
   *    因此必须先进行jwt校验，再进行角色校验
   * @param article
   */
  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  addArticle(@Body() article: Article) {
    return this.articleService.addArticle(article);
  }

  @Get()
  findArticlesByTitle(@Query('title') title: string) {
    return this.articleService.findArticlesByTitle(title);
  }

  @Get('all')
  findArticles(@Query('p') pageNum: number, @Query('ps') pageSize: number) {
    return this.articleService.findArticles(pageNum, pageSize);
  }

  @Get(':id')
  findArticleById(@Param('id') id: string) {
    return this.articleService.findArticleById(id);
  }
}
