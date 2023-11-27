import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';
import { User } from 'src/user/user.schema';

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

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: User.name }])
  creator: User;

  @Prop()
  certificates: string[];

  @Prop()
  isNatural: boolean;

  @Prop()
  price: number;

  @Prop()
  stock: string;

  @Prop()
  likes: ObjectId[];

  @Prop()
  favorites: ObjectId[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
