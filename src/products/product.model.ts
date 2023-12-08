import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import mongoose, { HydratedDocument } from 'mongoose';
import { Comment } from 'src/comments/comments.model';
import { User } from 'src/user/user.model';
import { CATEGORY } from './product.static';

export type UserDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
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

  @Prop({
    type: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId },
        rating: { type: Number },
      },
    ],
  })
  rating: { userId: User; rating: number };

  @Prop({ type: String, enum: CATEGORY })
  @IsEnum(CATEGORY)
  category: string;

  @Prop()
  avgRating: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
