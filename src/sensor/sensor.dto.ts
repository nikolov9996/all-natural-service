import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSensorDto {
  @IsString()
  @IsNotEmpty()
  readonly temperature: string;

  @IsString()
  @IsNotEmpty()
  readonly humidity: string;

  readonly time: string;
}

export class UpdateSensorDto extends PartialType(CreateSensorDto) {}
