import { Controller, Post, Body, Logger, UseGuards } from '@nestjs/common';
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
   * 1. @UseGuards()有执行顺序，靠近方法的（在下面的）会先执行，由于在jwt验证过程中会添加角色，
   *    并将user对象绑定到Request上去，因此必须先进行jwt校验，再进行角色校验
   * @param article
   */
  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard('jwt'))
  addArticle(@Body() article: Article) {
    return this.articleService.addArticle(article);
  }
}
