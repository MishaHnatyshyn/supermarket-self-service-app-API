import { IsNotEmpty } from 'class-validator';
import {ApiModelProperty} from '@nestjs/swagger';

export class UserJwtDto {
  @ApiModelProperty()
  @IsNotEmpty()
  email: string;

  @ApiModelProperty()
  @IsNotEmpty()
  id: number;
}
