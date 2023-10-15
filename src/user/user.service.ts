import { Injectable } from '@nestjs/common';
import { User, users } from './user.static';

@Injectable()
export class UserService {
  getUser(): User {
    return users.find((user) => user.id === '1');
  }
}
