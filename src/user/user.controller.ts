import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Param,
  Put,
  NotFoundException,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './user.dto';
import { ObjectId } from 'mongoose';
import { httpErrorMessages } from '../utils/httpErrorMessages';
import { ProductService } from 'src/products/product.service';
import { CommentsService } from 'src/comments/comments.service';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

const { errorMessage, notFoundException } = httpErrorMessages;
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly commentService: CommentsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  async loginUser(
    @Res() response,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<{ token: string }> {
    try {
      const user = await this.userService.getUserByUsername(
        loginUserDto.username,
      );

      if (!user) {
        notFoundException(
          `Error: User with username: '${loginUserDto.username}' not found!`,
        );
      }

      return response.status(HttpStatus.OK).json({
        user: user,
        token: await this.jwtService.signAsync({
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          isSeller: user.isSeller,
          userId: user._id,
        }),
      });
    } catch (error) {
      log(error.message);
      errorMessage(response, 'Something went wrong while authenticating');
    }
  }

  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        User: newUser,
      });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }

  @Get()
  async getManyUsers(@Res() response, @Query('count') count: number) {
    if (!count) {
      count = 10;
    }
    const users = await this.userService.getManyUsers(count);
    return response.status(HttpStatus.OK).json({
      Users: users,
    });
  }

  @Get(':id')
  async getUser(@Res() response, @Param('id') userId: ObjectId) {
    try {
      const user = await this.userService.getUser(userId);

      if (!user) {
        notFoundException(`Error: User ${userId} not found!`);
      }

      return response.status(HttpStatus.OK).json({
        User: user,
      });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }

  @Put(':id')
  async updateUser(
    @Res() response,
    @Param('id') userId: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const updatedUser = await this.userService.updateUser(
        userId,
        updateUserDto,
      );

      if (!updatedUser) {
        notFoundException(`User #${userId} not found!`);
      }

      return response.status(HttpStatus.OK).json({
        User: updatedUser,
      });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }

  @Delete(':id')
  async deleteUser(@Res() response, @Param('id') userId: ObjectId) {
    try {
      const deleted = await this.userService.deleteUser(userId);

      if (!deleted) {
        throw new NotFoundException(`User #${userId} not found!`);
      }

      if (deleted.comments.length) {
        const promises = deleted.comments.map(async (id) => {
          await this.commentService.deleteComment(id);
        });

        await Promise.all(promises);
      }

      await this.productService.removeDeletedUser(userId);

      return response.status(HttpStatus.OK).json({
        deleted,
        message: 'Deleted successfully',
      });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }
}
