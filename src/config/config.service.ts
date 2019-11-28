import { Injectable, Inject } from '@nestjs/common';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor(@Inject('CONFIG_OPTIONS') options: { folder: string }) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = `${process.cwd()}${options.folder}/${filePath}`;
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
