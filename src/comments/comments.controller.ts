import { Controller, Res, Param, Body, Post, HttpStatus } from '@nestjs/common';
import { ProductService } from 'src/products/product.service';
import { UserService } from 'src/user/user.service';
import { CommentsService } from './comments.service';
import { ObjectId } from 'mongoose';
import { httpErrorMessages } from 'src/utils/httpErrorMessages';

const { errorMessage, notFoundException } = httpErrorMessages;

interface CommentBody {
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
      const user = await this.userService.userExist(userId);
      const product = await this.productService.productExist(productId);

      const comment = await this.commentsService.createComment(
        userId,
        productId,
        body.content,
        body.images,
      );

      return response
        .status(HttpStatus.CREATED)
        .json({ comment, user, product });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }
}
