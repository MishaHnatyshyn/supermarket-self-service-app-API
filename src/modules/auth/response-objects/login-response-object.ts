import {ApiResponseModelProperty} from '@nestjs/swagger';

export class LoginResponseObject {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  access_token: string;
}
