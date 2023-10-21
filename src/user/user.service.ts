import { Injectable } from '@nestjs/common';
import { UserType, getUser } from './user.static';

@Injectable()
export class UserService {
  getUser(): UserType {
    const user = getUser();
    return user;
  }
}
