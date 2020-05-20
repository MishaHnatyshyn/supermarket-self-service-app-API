import {
  Body,
  Controller, Get, Param, Post, Request, UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import BasketService from '../services/basket.service';
import NewBasketStoreIdDto from '../dto/create-basket.dto';
import EmptyBasketDto from '../dto/empty-basket.dto';
import IdDto from '../../../shared/dto/id.dto';
import BasketDetailsDto from '../dto/basket-details.dto';
import { OptionalJwtAuthGuard } from '../../auth/strategies/optional-auth.guard';

@ApiUseTags('basket')
@Controller('basket')
export default class BasketController {
  constructor(private basketService: BasketService) {}

  @ApiCreatedResponse({ type: EmptyBasketDto })
  @UseGuards(OptionalJwtAuthGuard)
  @Post()
  creteBasket(@Body() { storeId }: NewBasketStoreIdDto, @Request() { user }): Promise<EmptyBasketDto> {
    return this.basketService.createNewEmptyBasket(storeId, user?.id);
  }

  @ApiOkResponse({ type: BasketDetailsDto })
  @Get(':id')
  getBasketDetails(@Param() { id }: IdDto): Promise<BasketDetailsDto> {
    return this.basketService.getBasketDetails(id);
  }
}
