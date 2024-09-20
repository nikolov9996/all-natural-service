import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import refreshJwtConfig from 'src/config/refresh-jwt.config';
import { IUser } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<object | null> {
    const user = await this.userService.getUserByUsername(username);
    if (user) {
      const isMatch = await compare(password, user.password);
      if (isMatch) {
        return user;
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
      refresh_token: this.jwtService.sign(
        { id: user.id },
        this.refreshTokenConfig,
      ),
    };
  }
}
