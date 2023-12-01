import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from 'src/comments/comments.model';
import { User } from 'src/user/user.model';

export type UserDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  tags: string[];

  @Prop()
  description: string;

  @Prop()
  photos: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator: User;

  @Prop()
  certificates: string[];

  @Prop()
  isNatural: boolean;

  @Prop()
  price: number;

  @Prop()
  stock: string;

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ])
  favorites: User[];

  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ])
  comments: Comment[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
