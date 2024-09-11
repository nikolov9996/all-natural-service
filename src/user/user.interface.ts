import { Document, ObjectId } from 'mongoose';

export interface IUser extends Document {
  readonly username: string;
  readonly email: string;
  readonly avatar: string;
  readonly isSeller: boolean;
  readonly password: string;
  readonly favorites: ObjectId[];
  readonly comments: ObjectId[];
  readonly _id?: ObjectId;
}
