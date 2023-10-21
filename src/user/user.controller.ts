import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { UserType } from './user.static';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user')
  getHello(): UserType {
    return this.userService.getUser();
  }
}
