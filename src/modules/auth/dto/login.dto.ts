import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
