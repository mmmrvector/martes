import { Injectable, Logger, HttpService } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import * as qiniu from 'qiniu';

@Injectable()
export class ImageService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * 获取七牛云上传文件的token
   */
  getUploadToken() {
    const ak = this.configService.get('QINIU_AK');
    const sk = this.configService.get('QINIU_SK');
    const mac = new qiniu.auth.digest.Mac(ak, sk);
    const options = {
      scope: 'martes',
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return uploadToken;
  }
}
