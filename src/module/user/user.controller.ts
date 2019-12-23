import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../database/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorator/roles.decorator';
import { RolesGuard } from 'src/guard/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 添加一个用户
   * @param user 用户
   */
  @Post()
  async addUser(@Body() user: User) {
    const retUser = await this.userService.createUser(user);
    delete retUser.password;
    delete retUser.roles;
    return retUser;
  }

  /**
   * 获取用户列表
   * @param pageNum 页数
   * @param pageSize 每页数据数
   */
  @Get('all')
  @Roles('admin')
  @UseGuards(RolesGuard)
  findUsers(@Query('p') pageNum: number, @Query('ps') pageSize: number) {
    return this.userService.findUsers(pageNum, pageSize);
  }

  /**
   * 获取用户信息，只有用户本人或者管理员才可以调用此接口
   * @param id
   * @param req
   */
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findUserById(@Param('id') id: number, @Request() req) {
    if (
      req.user.userId !== id &&
      !req.user.roles.some(role => ['admin'].includes(role))
    )
      throw new UnauthorizedException();

    const user = await this.userService.findUserById(id);
    delete user.password;
    delete user.roles;
    return user;
  }
}
