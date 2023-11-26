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
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  readonly name;

  @IsArray()
  readonly tags;

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

  @IsArray()
  readonly certificates;

  @IsBoolean()
  @IsNotEmpty()
  readonly isNatural;

  @IsNumber()
  @IsNotEmpty()
  readonly price;

  @IsString()
  @IsNotEmpty()
  readonly stock;

  @IsArray()
  readonly likes;

  @IsArray()
  readonly favorites;

  @IsArray()
  readonly comments;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
