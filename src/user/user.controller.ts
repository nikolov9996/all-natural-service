import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.static';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user')
  getHello(): User {
    return this.userService.getUser();
  }
}
