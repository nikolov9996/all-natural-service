import {
  Controller,
  Res,
  Delete,
  Param,
  Body,
  Post,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ProductService } from 'src/products/product.service';
import { UserService } from 'src/user/user.service';
import { CommentsService } from './comments.service';
import { ObjectId } from 'mongoose';
import { httpErrorMessages } from 'src/utils/httpErrorMessages';

const { errorMessage, notFoundException } = httpErrorMessages;

export interface CommentBody {
  content: string;
  images: string[];
}

@Controller()
export class CommentsController {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post(':productId/:userId')
  async createComment(
    @Res() response,
    @Param('userId') userId: ObjectId,
    @Param('productId') productId: ObjectId,
    @Body() body: CommentBody,
  ) {
    try {
      const user = await this.userService.getUser(userId);
      const product = await this.productService.getProduct(productId);

      if (!user || !product) {
        notFoundException('User or Product do not exist!');
      }

      const comment = await this.commentsService.createComment(
        userId,
        productId,
        body.content,
        body.images,
      );

      if (!comment) {
        notFoundException('Something went wrong');
      }

      user.comments.push(comment._id); // saving comment ID in user and product
      user.save();

      product.comments.push(comment._id);
      product.save();

      return response.status(HttpStatus.CREATED).json({ comment });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }

  @Put(':id')
  async updateComment(
    @Res() response,
    @Param('id') commentId: ObjectId,
    @Body() newBody: CommentBody,
  ) {
    try {
      const updatedComment = await this.commentsService.updateComment(
        commentId,
        newBody,
      );

      if (!updatedComment) {
        notFoundException(`Comment ${commentId} not found!`);
      }

      return response.status(HttpStatus.OK).json(updatedComment);
    } catch (error) {
      errorMessage(response, error.message);
    }
  }

  @Delete(':id')
  async deleteComment(@Res() response, @Param('id') commentId: ObjectId) {
    try {
      const deleted = await this.commentsService.deleteComment(commentId);

      if (!deleted) {
        notFoundException(`Error: Comment ${commentId} not found!`);
      }
      return response.status(HttpStatus.OK).json({
        deleted,
        message: 'Deleted successfully',
      });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }
}
