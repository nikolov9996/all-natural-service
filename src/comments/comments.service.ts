import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { IUser } from 'src/user/user.interface';
import { IComment } from './comments.interface';
import { IProduct } from 'src/products/products.interface';
import { CommentBody } from './comments.controller';

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

  async updateComment(commentId: ObjectId, body: CommentBody) {
    const updatedComment = await this.commentsModel
      .findByIdAndUpdate(commentId, body, {
        new: true,
      })
      .exec();

    return updatedComment;
  }

  async deleteComment(commentId: ObjectId) {
    const isDeleted = await this.commentsModel.findByIdAndDelete({
      _id: commentId,
    });

    if (isDeleted) {
      // Remove the comment ID from the product and user's comments array
      await this.userModel.findByIdAndUpdate(isDeleted.user, {
        $pull: { comments: isDeleted._id },
      });

      await this.productModel.findByIdAndUpdate(isDeleted.product, {
        $pull: { comments: isDeleted._id },
      });
    }
    return isDeleted;
  }
}
