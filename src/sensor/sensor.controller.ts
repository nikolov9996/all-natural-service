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
@Controller()
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
  async getSensorRecords(
    @Res() response,
    @Query('count') count: number,
    @Query('page') page: number,
  ) {
    if (!count) {
      count = 10;
    }

    if (!page) {
      page = 1;
    }
    try {
      const results = await this.sensorService.getManySensorResults(
        count,
        page,
      );
      return response.status(HttpStatus.OK).json({
        Sensor: results,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/day')
  async getSensorRecordForDay(@Res() response, @Query('date') date: string) {
    if (!date) {
      date = new Date().toISOString();
    }
    try {
      const results = await this.sensorService.getSensorResultForDay(date);
      return response.status(HttpStatus.OK).json({
        Sensor: results,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST);
    }
  }
}
