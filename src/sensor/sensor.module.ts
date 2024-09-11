import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from 'src/products/products.module';
import { CommentsModule } from 'src/comments/comments.module';
import { SensorSchema } from './sensor.model';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';

@Module({
  imports: [
    ProductModule,
    forwardRef(() => CommentsModule),
    MongooseModule.forFeature([{ name: 'Sensor', schema: SensorSchema }]),
  ],
  controllers: [SensorController],
  providers: [SensorService],
  exports: [SensorService],
})
export class SensorModule {}
