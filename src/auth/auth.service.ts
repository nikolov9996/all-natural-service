import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<object | null> {
    const user = await this.userService.getUserByUsername(username);
    if (user) {
      const isMatch = await compare(password, user.password);
      if (isMatch) {
        const { password, ...rest } = user;
        return rest;
      }
    } else {
      return null;
    }

    return null;
  }
}
