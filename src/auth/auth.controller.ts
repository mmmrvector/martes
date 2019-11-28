import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LogonService } from './logon.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly logonService: LogonService) {}

  @UseGuards(AuthGuard('local'))
  @Post('logon')
  async logon(@Request() req) {
    return req.user;
  }
}
