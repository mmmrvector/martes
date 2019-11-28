import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleModule } from './module/article/article.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptor/logger.interceptor';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/martes'),
    ArticleModule,
    AuthModule,
    DatabaseModule.forRoot({ folder: '/env/database' }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
