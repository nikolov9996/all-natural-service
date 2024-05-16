import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';

import { httpErrorMessages } from '../utils/httpErrorMessages';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './sensor.dto';

const { errorMessage } = httpErrorMessages;
@Controller('/sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Post()
  async createSensor(
    @Res() response,
    @Body() createSensorDto: CreateSensorDto,
  ) {
    try {
      const newSensorData = await this.sensorService.createSensor({
        ...createSensorDto,
        time: new Date().toISOString(),
      });
      return response.status(HttpStatus.CREATED).json({
        Sensor: newSensorData,
      });
    } catch (error) {
      errorMessage(response, error.message);
    }
  }

  @Get()
  async getSensorRecords(@Res() response, @Query('count') count: number) {
    if (!count) {
      count = 10;
    }
    const results = await this.sensorService.getManySensorResults(count);
    return response.status(HttpStatus.OK).json({
      Results: results,
    });
  }
}
