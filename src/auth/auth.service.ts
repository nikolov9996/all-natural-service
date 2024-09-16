import {
  Body,
  HttpStatus,
  Injectable,
  NotFoundException,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { IUser } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUserDto } from 'src/user/user.dto';
import { httpErrorMessages } from 'src/utils/httpErrorMessages';
import { log } from 'console';

const { errorMessage, notFoundException } = httpErrorMessages;
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(user: IUser) {
    const payload = {
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      isSeller: user.isSeller,
      userId: user._id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
