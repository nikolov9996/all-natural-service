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

  async getManySensorResults(count: number, skip: number) {
    const results = await this.sensorModel
      .find()
      .sort({ createdAt: 'desc' })
      .limit(count)
      .skip(skip)
      .exec();
    return results.reverse();
  }

  async getSensorResultForDay(day: string) {
    const results = await this.sensorModel
      .find({
        createdAt: {
          $gte: new Date(day),
          $lt: new Date(day).setHours(23,59),
        },
      })
      .sort({ createdAt: 'desc' })
      .exec();
    return results.reverse();
  }
}
