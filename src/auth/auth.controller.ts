import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { LoginUserDto } from 'src/user/user.dto';
import { httpErrorMessages } from 'src/utils/httpErrorMessages';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { log } from 'console';
import { RefreshAuthGuard } from './guard/refresh-auth.guard';

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

      const resp = await this.authService.login(user);

      return response.status(HttpStatus.OK).json({
        ...resp,
      });
    } catch (error) {
      log(error.message);
      errorMessage(response, 'Something went wrong while authenticating');
    }
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh-token')
  async refreshToken(@Body() body, @Res() response) {
    // If userId is missing from request all ways the response will be 401!
    if (!body.userId) {
      throw new UnauthorizedException('userId is required!');
    }
    const resp = await this.authService.refreshToken(body.userId);

    if (!resp) {
      throw new UnauthorizedException('userId is invalid!');
    }

    return response.status(HttpStatus.OK).json({
      ...resp,
    });
  }
}
