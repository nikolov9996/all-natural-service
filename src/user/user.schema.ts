import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  avatar: string;

  @Prop()
  isSeller: boolean;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
