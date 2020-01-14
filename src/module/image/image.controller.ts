import { Controller, Get, Post } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('uptoken')
  getUploadToken() {
    return this.imageService.getUploadToken();
  }

  @Post('album')
  createAlbum() {}

  @Get('albums')
  findAlbums() {}

  @Get('album/photos')
  findPhotos() {}

  @Get('album/photo/:id')
  findPhoto() {}

  @Post('album/photo')
  addPhoto() {}

  @Post('album/photos')
  addPhotos() {}

  @Get('album/:id')
  findAlbum() {}
}
