import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/entity/user.entity';
import { Repository } from 'typeorm';
import { createHash } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findUserByUsername(username: string) {
    return this.userRepo.findOne({ username });
  }

  async findUserByNickName(nickname: string) {
    return this.userRepo.find({ nickname });
  }

  async findUserById(id: number) {
    return this.userRepo.findOne(id);
  }

  async findUsers(pageNum: number, pageSize: number) {
    return this.userRepo.find({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    });
  }

  async createUser(user: User) {
    // 加密密码
    user.password = createHash('md5')
      .update(user.password)
      .digest('hex');
    return this.userRepo.save(user);
  }
}
