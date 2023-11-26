import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

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

  @Prop({ type: String })
  creator: ObjectId;

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
