import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SensorDocument = HydratedDocument<Sensor>;

@Schema({ timestamps: true })
export class Sensor {
  @Prop()
  temperature: string;

  @Prop()
  humidity: string;

  @Prop()
  time: string;
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
