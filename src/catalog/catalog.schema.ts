import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatalogDocument = HydratedDocument<Catalog>;

@Schema()
export class Catalog {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  backgroundImage: string;
}

export const CatalogSchema = SchemaFactory.createForClass(Catalog);
