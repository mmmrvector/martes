import {
  Controller,
  Get,
  Post,
  UseGuards,
  Body,
  Req,
  Query,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { AuthGuard } from '@nestjs/passport';
import { Photo, Album } from '../../database/entity';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('uptoken')
  getUploadToken() {
    return this.imageService.getUploadToken();
  }

  @Post('album')
  @UseGuards(AuthGuard('jwt'))
  createAlbum(@Body() body: { album: Album; userId: number }) {
    const { album, userId } = body;
    return this.imageService.createAlbum(album, userId);
  }

  @Post('album/photo')
  @UseGuards(AuthGuard('jwt'))
  addPhoto(@Req() req: any, @Body() body: { photo: Photo }) {
    const user = req.user;
    const { photo } = body;
    return this.imageService.addPhoto(photo, user);
  }

  @Post('album/photos')
  @UseGuards(AuthGuard('jwt'))
  addPhotos(
    @Req() req: any,
    @Body() body: { photos: Photo[]; albumId: number },
  ) {
    const user = req.user;
    const { photos, albumId } = body;
    return this.imageService.addPhotos(photos, albumId, user);
  }

  @Get('albums/user')
  @UseGuards(AuthGuard('jwt'))
  findAlbumsByUser(
    @Req() req: any,
    @Query('p') p: number,
    @Query('ps') ps: number,
  ) {
    const user = req.user;
    return this.imageService.findAlbumsByUser(user, p, ps);
  }

  @Get('albums')
  findAlbums(@Query('p') p: number, @Query('ps') ps: number) {
    return this.imageService.findAlbums(p, ps);
  }

  @Get('album/user/:id')
  @UseGuards(AuthGuard('jwt'))
  findAlbumByUser(@Req() req: any, @Param('id') id: number) {
    const user = req.user;
    return this.imageService.findAlbumByUser(id, user);
  }

  @Get('album/:id')
  findAlbum(@Param('id') id: number) {
    return this.imageService.findAlbum(id);
  }

  @Delete('album/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteAlbum(@Param('id') id: number) {
    return this.imageService.deleteAlbum(id);
  }

  @Delete('photo/:id')
  @UseGuards(AuthGuard('jwt'))
  deletePhoto(@Param('id') id: number) {
    return this.imageService.deletePhoto(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file) {
    return this.imageService.uploadImage(file);
  }
}
