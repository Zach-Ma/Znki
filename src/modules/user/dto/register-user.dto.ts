import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { baseEncrypt } from '../../../shared/utils/encrypt.util';
import { nanoid } from 'nanoid';
export class RegisterUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty({ message: 'username cant be empty' })
  readonly username: string;
  @ApiProperty()
  @IsEmail({}, { message: 'email is not correct' })
  @Transform((val: string) => val.toLowerCase())
  readonly email: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'pwd cant be empty' })
  @IsString()
  @Transform(val => baseEncrypt(val))
  readonly pwd: string;

  @Transform(() => nanoid(8))
  readonly uid: string;
}
