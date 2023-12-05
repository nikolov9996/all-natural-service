import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserModule } from 'src/user/user.module';
import { UserSchema } from 'src/user/user.model';
import { CommentSchema } from 'src/comments/comments.model';
import { ProductSchema } from './product.model';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => CommentsModule),
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'User', schema: UserSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
