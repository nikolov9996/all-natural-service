import { Document, ObjectId } from 'mongoose';

export interface IComment extends Document {
  readonly user: ObjectId;
  readonly product: ObjectId;
  readonly content: string;
  readonly images: string[];
}
