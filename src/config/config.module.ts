import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from './config.service';

/**
 * 动态模块配置
 */
@Module({})
export class ConfigModule {
  /**
   * @param { folder: string } options 配置文件所在文件夹名称
   * @example
   * `@module({
   *    imports: [ConfigModule.resiger({ folder: '/config/database' })]
   * })`
   */
  static register(options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'CONFIG_OPTIONS',
          useValue: options,
        },
        ConfigService,
      ],
      exports: [ConfigService],
    };
  }
}
