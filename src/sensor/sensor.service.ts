import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSensorDto } from './sensor.dto';
import { ISensor } from './sensor.interface';

@Injectable()
export class SensorService {
  constructor(@InjectModel('Sensor') private sensorModel: Model<ISensor>) {}

  async createSensor(createSensorDto: CreateSensorDto): Promise<ISensor> {
    const newSensorData = await new this.sensorModel(createSensorDto);
    return newSensorData.save();
  }

  async getManySensorResults(count: number) {
    const results = await this.sensorModel.find({}).limit(count);
    return results;
  }
}
