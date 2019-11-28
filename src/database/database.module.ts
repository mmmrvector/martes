import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({})
export class DatabaseModule {
  static forRoot(options: { folder: string }): DynamicModule {
    const config = new ConfigService(options);
    const defaultOptions = JSON.parse(config.get('DB_OPTION'));
    const imports = [
      TypeOrmModule.forRoot({
        ...defaultOptions,
        database: 'martes',
        entities: [__dirname + '/../database/entity/*{.ts,.js}'],
      }),
    ];
    return {
      module: DatabaseModule,
      imports,
    };
  }
}
