import { ApiResponseModelProperty } from '@nestjs/swagger';

export default class DeleteResultDto {
  @ApiResponseModelProperty({ type: []})
  raw: any[];

  @ApiResponseModelProperty()
  affected: number;
}
