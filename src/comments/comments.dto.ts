import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsNotEmpty, MaxLength, IsArray } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  readonly user;

  @IsString()
  @IsNotEmpty()
  readonly product;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  readonly content;

  @IsArray()
  readonly images;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
