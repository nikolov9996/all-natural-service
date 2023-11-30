// comment.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Product } from 'src/products/product.model';
import { User } from 'src/user/user.model';

@Schema()
export class Comment extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  product: Product;

  @Prop({ required: true })
  content: string;

  @Prop({ required: false })
  images: string[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
