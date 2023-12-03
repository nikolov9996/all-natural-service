import { Document, ObjectId } from 'mongoose';

export interface Rating {
  userId: ObjectId;
  rating: number;
}
export interface IProduct extends Document {
  readonly name: string;
  readonly tags: string;
  readonly description: string;
  readonly photos: string[];
  readonly creator: ObjectId;
  readonly certificates: string[];
  readonly price: number;
  readonly stock: string;
  readonly isNatural: boolean;
  readonly favorites: ObjectId[];
  readonly comments: ObjectId[];
  readonly rating: Rating[];
}
