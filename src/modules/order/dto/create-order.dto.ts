import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsBoolean, ValidateNested } from 'class-validator';
import NewPaymentMethodDto from '../../payment/dto/newPaymentMethod.dto';

export default class CreateOrderDto {
  @ApiModelProperty()
  @IsNumber()
  basketId: number;

  @ApiModelProperty()
  @IsNumber()
  totalOrderSum: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNumber()
  paymentMethodId: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsBoolean()
  saveNewPaymentMethod: boolean;

  @ApiModelPropertyOptional({ type: NewPaymentMethodDto })
  @IsOptional()
  @ValidateNested()
  paymentDetails: NewPaymentMethodDto;
}
