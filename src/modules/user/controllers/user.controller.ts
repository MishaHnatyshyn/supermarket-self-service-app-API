import { Body, Controller, Get, Param, Post, Request, UseGuards, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import IdDto from '../../../shared/dto/id.dto';
import UserService from '../services/user.service';
import UserDto from '../dto/user.dto';
import NewPaymentMethodDto from '../dto/newPaymentMethod.dto';
import { AuthGuard } from '@nestjs/passport';
import PaymentMethodDto from '../dto/paymentMethod.dto';

@ApiUseTags('user')
@Controller('user')
export default class UserController {
  constructor(private userService: UserService) {}

  @ApiOkResponse({ type: UserDto })
  @Get(':id')
  getUserDetails(@Param() { id }: IdDto): Promise<UserDto> {
    return this.userService.getUserDetails(id);
  }

  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PaymentMethodDto })
  @UseGuards(AuthGuard('user'))
  @Post('payment')
  addPaymentMethod(
    @Body() paymentData: NewPaymentMethodDto,
      @Request() { user },
  ): Promise<PaymentMethodDto> {
    return this.userService.addPaymentMethod(paymentData, user.id);
  }

  @ApiBearerAuth()
  @ApiOkResponse({ type: PaymentMethodDto })
  @Delete('payment/:id')
  deletePaymentMethod(@Param() { id }: IdDto): Promise<object> {
    return this.userService.deletePaymentMethod(id);
  }
}
