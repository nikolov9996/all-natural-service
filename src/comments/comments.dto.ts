import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

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
}
