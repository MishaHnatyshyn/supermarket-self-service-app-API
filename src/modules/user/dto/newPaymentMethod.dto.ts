import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumberString, Length } from 'class-validator';

export default class NewPaymentMethodDto {
  @ApiModelProperty()
  @IsNumberString()
  @Length(16, 16)
  cardNumber: string;

  @ApiModelProperty()
  @IsString()
  @Length(5, 5)
  dueDate: string;

  @ApiModelProperty()
  @IsNumberString()
  @Length(3, 3)
  cvvCode: string;
}
