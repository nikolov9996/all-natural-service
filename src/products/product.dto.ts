import { PartialType } from '@nestjs/mapped-types';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  // including only fields that will be required
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  readonly name;

  @IsString()
  @IsNotEmpty()
  @MaxLength(600)
  readonly description;

  @IsNotEmpty()
  @IsArray()
  @ArrayMaxSize(10)
  readonly photos;

  @IsString()
  readonly creator;

  @IsBoolean()
  @IsNotEmpty()
  readonly isNatural;

  @IsNumber()
  @IsNotEmpty()
  readonly price;

  @IsString()
  @IsNotEmpty()
  readonly stock;

  @IsString()
  @IsNotEmpty()
  readonly category;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
