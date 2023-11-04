import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly username: string;
  readonly email: string;
  readonly avatar: string;
  readonly isSeller: boolean;
  readonly password: string;
}
