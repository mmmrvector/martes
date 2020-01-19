import { Injectable, Logger, HttpService, HttpException } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import * as qiniu from 'qiniu';
import { Album, User, Photo, TYPE } from '../../database/entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import * as stream from 'stream';
import * as fs from 'fs';

@Injectable()
export class ImageService {
  private readonly logger = new Logger('image');
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
  ) {}

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

  async createAlbum(album: Album, userId: number) {
    const user = await this.userRepository.findOne(userId);
    const createdAt = new Date();
    const updatedAt = new Date();
    const res = await this.albumRepository.save({
      ...album,
      createdAt,
      updatedAt,
    });
    return { ...res, username: user.username, profile: user.profilePicture };
  }

  async findAlbum(id: number) {
    const album = await this.albumRepository.findOne({
      where: { id, type: TYPE.PUBLIC },
    });
    const photos = await this.photoRepository.find({
      where: { albumId: id },
    });
    return { album, photos };
  }

  async findAlbumByUser(id: number, user: any) {
    const album = await this.albumRepository.findOne(id);
    return album;
  }

  async findAlbums(page: number, pageSize: number) {
    const albums = await this.albumRepository.find({
      where: { type: TYPE.PUBLIC },
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    const res = await Promise.all(
      albums.map(async album => {
        const photo = await this.photoRepository.findOne({
          where: { albumId: album.id },
        });
        return { album, cover: photo };
      }),
    );
    return res;
  }

  async findAlbumsByUser(user: any, page: number, pageSize: number) {
    const albums = await this.albumRepository.find({
      where: [
        { type: TYPE.PUBLIC },
        { type: TYPE.PRIVATE, userId: user.userId },
      ],
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
    const res = await Promise.all(
      albums.map(async album => {
        const photo = await this.photoRepository.findOne({
          where: { albumId: album.id },
        });
        return { album, cover: photo };
      }),
    );
    return res;
  }

  async addPhoto(photo: Photo, user: any) {
    const album = await this.albumRepository.findOne(photo.albumId);
    if (album.userId !== user.userId)
      throw new HttpException('没有权限向该相册添加照片', 403);
    const res = await this.photoRepository.save(photo);
    return res;
  }

  async addPhotos(photo: Photo[], albumId: number, user: any) {}

  async deleteAlbum(id: number) {
    return this.albumRepository.delete({ id });
  }

  async deletePhoto(id: number) {
    return this.photoRepository.delete({ id });
  }

  // 对于使用了回调函数的代码，将其包装成Promise
  async upload(file: any) {
    return new Promise((resolve, reject) => {
      const uptoken = this.getUploadToken();
      const config = new qiniu.conf.Config() as any;
      config.zone = qiniu.zone.Zone_z0;

      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);

      const formUploader = new qiniu.form_up.FormUploader(config);
      const putExtra = new qiniu.form_up.PutExtra();

      formUploader.putStream(
        uptoken,
        null,
        bufferStream,
        putExtra,
        (err, body, info) => {
          if (err) reject(err);
          if (info.statusCode === 200)
            resolve({ url: `http://img-url.mrvector.cn/${body.key}` });
          else reject({ status: info.statusCode, body });
        },
      );
    });
  }

  async uploadImage(file: any) {
    const res = await this.upload(file);
    return res;
  }

  formatDate(date: Date) {
    return date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : null;
  }
}
