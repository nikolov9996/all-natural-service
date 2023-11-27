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
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { ObjectId } from 'mongoose';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.userService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        User: newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not created!',
        error: 'Bad Request',
      });
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
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: 404,
          message: 'Error: User not found!',
          error: 'Not Found',
        });
      }

      return response.status(HttpStatus.FOUND).json({
        User: user,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Bad Request!',
        error: 'Bad Request',
      });
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
        throw new NotFoundException(`User #${userId} not found!`);
      }

      return response.status(HttpStatus.OK).json({
        User: updatedUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: User not updated!',
        error: 'Bad Request',
      });
    }
  }

  @Delete(':id')
  async deleteUser(@Res() response, @Param('id') userId: ObjectId) {
    try {
      const deleted = await this.userService.deleteUser(userId);

      if (!deleted) {
        throw new NotFoundException(`User #${userId} not found!`);
      }

      return response.status(HttpStatus.OK).json({
        deleted,
        message: 'Deleted successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: error.message,
        error: 'Bad Request',
      });
    }
  }
}
