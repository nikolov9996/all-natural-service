import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { IUser } from './user.interface';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<IUser>) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const passwordHash = await hash(createUserDto.password, 8);
    const newStudent = await new this.userModel({
      ...createUserDto,
      password: passwordHash,
    });
    return newStudent.save();
  }

  async getManyUsers(count: number): Promise<IUser[]> {
    const users = await this.userModel.find({}).limit(count);
    return users;
  }

  async getUserByUsername(username: string): Promise<IUser> {
    const user: IUser = await this.userModel.findOne({ username });
    return user;
  }

  async getUser(userId: ObjectId) {
    const user = await this.userModel
      .findById(userId)
      .populate('favorites')
      .exec();
    return user;
  }

  async updateUser(userId: ObjectId, body: UpdateUserDto) {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: userId },
      body,
      { new: true }, // to return the document after update
    );
    return updatedUser;
  }

  async deleteUser(userId: ObjectId) {
    const isDeleted = await this.userModel.findByIdAndDelete({ _id: userId });
    return isDeleted;
  }

  async userExist(userId: ObjectId) {
    return await this.userModel.exists({ _id: userId });
  }

  async removeDeletedProduct(productId: ObjectId) {
    return await this.userModel.updateMany(
      { favorites: productId },
      { $pull: { favorites: productId } },
    );
  }
}
