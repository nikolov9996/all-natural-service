import { Document, ObjectId } from 'mongoose';

export interface ISensor extends Document {
  readonly temperature: string;
  readonly humidity: string;
  readonly time: string;
}
