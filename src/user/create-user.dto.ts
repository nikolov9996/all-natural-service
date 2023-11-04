import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  IsBoolean,
  IsEmail,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  readonly avatar: string;

  @IsBoolean()
  @IsNotEmpty()
  readonly isSeller: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  readonly password: string;
}
