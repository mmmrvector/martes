import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { RedisFactory } from '../module/utils/redis.service';
import { randomService } from '../module/utils/random.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly cli = RedisFactory.useFactory();
  private readonly logger = new Logger('interceptor');

  async intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest();
    const cookie = req.headers.cookie;
    // 设置 cookie - reqId键值对，并存入redis中，对于相同的cookie认为是连续的请求
    let reqId = await this.cli.getAsync(`cookie:${cookie}`);
    if (!reqId) {
      reqId = new randomService().guid();
      await this.cli.setAsync(`cookie:${cookie}`, reqId);
    }
    // 记录发送请求的日志
    this.logger.log(
      `${new Date().toLocaleString()} - ReqId:${reqId} - Req: Method: ${JSON.stringify(
        req.route.methods,
      )}, Path: ${JSON.stringify(
        req.route.path,
      )}, QueryParams: ${JSON.stringify(
        req.query,
      )}, BodyParams: ${JSON.stringify(req.body)}`,
    );

    return next.handle().pipe(
      map(data => {
        // 记录返回值的日志
        this.logger.log(
          `${new Date().toLocaleString()} - ReqId:${reqId} - Res: ${JSON.stringify(
            data,
          )}`,
        );
        return data;
      }),
    );
  }
}
