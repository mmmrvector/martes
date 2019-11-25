import * as reids from 'redis';
import { promisifyAll } from 'bluebird';
import { Logger } from '@nestjs/common';

export const RedisFactory = {
  provide: 'REDIS',
  useFactory: () => {
    const logger = new Logger('REDIS');
    promisifyAll(reids);
    const cli = reids.createClient();
    cli.on('ready', () => logger.log('ready'));
    cli.on('reconnecting', () => logger.warn('reconnecting'));
    cli.on('error', err => logger.error(err));
    cli.on('end', () => logger.warn('end'));
    return cli;
  },
};
