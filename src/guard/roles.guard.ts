import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  // 反射器Reflector允许我们很容易地通过指定的键轻松访问元数据
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) {
    // getHandler()方法返回对将要调用的处理程序的引用
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // 如果roles为空说明该方法没有限制用户角色
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => user.roles.some(role => roles.includes(role));
    return user && user.roles && hasRole();
  }
}
