import { ApiResponseModelProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiResponseModelProperty()
  id: number;

  @ApiResponseModelProperty()
  access_token: string;
}
