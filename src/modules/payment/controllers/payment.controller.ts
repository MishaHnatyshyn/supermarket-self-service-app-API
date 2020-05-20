import { Body, Controller, Param, Post, Request, UseGuards, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import IdDto from '../../../shared/dto/id.dto';
import PaymentService from '../services/payment.service';
import NewPaymentMethodDto from '../dto/newPaymentMethod.dto';
import { AuthGuard } from '@nestjs/passport';
import PaymentMethodDto from '../dto/paymentMethod.dto';

@ApiUseTags('payment')
@Controller('payment')
export default class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PaymentMethodDto })
  @UseGuards(AuthGuard('user'))
  @Post('')
  addPaymentMethod(
    @Body() paymentData: NewPaymentMethodDto,
      @Request() { user },
  ): Promise<PaymentMethodDto> {
    return this.paymentService.addPaymentMethod(paymentData, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: PaymentMethodDto })
  @Delete(':id')
  deletePaymentMethod(@Param() { id }: IdDto): Promise<object> {
    return this.paymentService.deletePaymentMethod(id);
  }
}
