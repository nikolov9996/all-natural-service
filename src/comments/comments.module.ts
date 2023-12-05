import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/products/product.model';
import { ProductModule } from 'src/products/products.module';
import { UserSchema } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentSchema } from './comments.model';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => ProductModule),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Product', schema: ProductSchema },
      { name: 'Comments', schema: CommentSchema },
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
