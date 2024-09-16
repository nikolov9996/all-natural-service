import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginUserDto } from 'src/user/user.dto';
import { httpErrorMessages } from 'src/utils/httpErrorMessages';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { log } from 'console';

const { errorMessage, notFoundException } = httpErrorMessages;

@Controller()
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async loginUser(
    @Res() response,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ token?: string; error?: string }> {
    try {
      const user = await this.userService.getUserByUsername(
        loginUserDto.username,
      );

      if (!user) {
        notFoundException(
          `Error: User with username: '${loginUserDto.username}' not found!`,
        );
      } else {
        const isMatch = await compare(loginUserDto.password, user.password);
        if (!isMatch) {
          return response.status(HttpStatus.UNAUTHORIZED).json({
            error: 'Wrong password',
          });
        }
      }

      return response.status(HttpStatus.OK).json({
        token: await this.authService.login(user),
      });
    } catch (error) {
      log(error.message);
      errorMessage(response, 'Something went wrong while authenticating');
    }
  }
}
