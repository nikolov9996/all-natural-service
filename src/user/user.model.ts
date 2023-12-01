import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from 'src/comments/comments.model';
import { Product } from 'src/products/product.model';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  avatar: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product.name,
    },
  ])
  favorites: Product[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ])
  comments: Comment[];

  @Prop()
  isSeller: boolean;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
