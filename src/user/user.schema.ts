import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/products/product.schema';

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

  @Prop()
  isSeller: boolean;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
