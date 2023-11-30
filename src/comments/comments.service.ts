import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { IUser } from 'src/user/user.interface';
import { IComment } from './comments.interface';
import { IProduct } from 'src/products/products.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser>,
    @InjectModel('Product') private productModel: Model<IProduct>,
    @InjectModel('Comments') private commentsModel: Model<IComment>,
  ) {}

  async createComment(
    userId: ObjectId,
    productId: ObjectId,
    content: string,
    images?: string[],
  ) {
    const product = await new this.commentsModel({
      user: userId,
      content,
      images,
      product: productId,
    });

    return product.save();
  }
}
