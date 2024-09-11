import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { ProductModule } from 'src/products/products.module';
import { ProductSchema } from 'src/products/product.model';
import { CommentSchema } from 'src/comments/comments.model';
import { CommentsModule } from 'src/comments/comments.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/etc/secrets/config';

@Module({
  imports: [
    ProductModule,
    JwtModule.register({
      global: true,
      secret: config.jwt_secret,
      signOptions: { expiresIn: '60s' },
    }),
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
