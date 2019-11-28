import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../module/user/user.module';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import { LogonService } from './logon.service';
import { UserService } from '../module/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entity/user.entity';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [UsersModule, PassportModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService, LocalStrategy, LogonService, UserService],
  controllers: [AuthController],
})
export class AuthModule {}
