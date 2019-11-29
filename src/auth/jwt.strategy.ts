import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Repository } from 'typeorm';
import { User } from 'src/database/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    //passport策略配置，更多可用选项参考 https://github.com/mikenicholson/passport-jwt#configure-strategy
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  /**
   * 对于JWT策略，Passport首先验证JWT的签名并解码JSON。然后调用validate()方法，该方法将解码后的JSON作为其
   * 单个参数传递。根据JWT签名的工作方式，可以保证接受到之前已签名并发给有效用户的有效token令牌
   * @param payload
   */
  async validate(payload: any) {
    //在此处给用户添加角色属性
    const user = await this.userRepository.findOne(payload.sub);
    const roles = user.roles;
    return {
      userId: payload.sub,
      username: payload.username,
      roles,
    };
  }
}
