import { Controller, Post, Body, Logger } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { Article } from "./article.interface";

@Controller('article')
export class ArticleController{
	private readonly logger = new Logger('article');
  constructor(
		private readonly articleService: ArticleService
	) {}

	@Post()
	addArticle(@Body() article: Article){
		return this.articleService.addArticle(article);
	}
}