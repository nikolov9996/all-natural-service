import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { ProductModule } from 'src/products/products.module';
import { ProductSchema } from 'src/products/product.model';
import { CommentSchema } from 'src/comments/comments.model';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
  imports: [
    ProductModule,
    forwardRef(() => CommentsModule),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
