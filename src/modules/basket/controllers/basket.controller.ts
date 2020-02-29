import {
  Body,
  Controller, Get, Param, Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import BasketService from '../services/basket.service';
import NewBasketStoreIdDto from '../dto/create-basket.dto';
import EmptyBasketDto from '../dto/empty-basket.dto';
import IdDto from '../../../shared/dto/id.dto';
import BasketDetailsDto from '../dto/basket-details.dto';

@ApiUseTags('basket')
@Controller('basket')
export default class BasketController {
  constructor(private basketService: BasketService) {}

  @ApiCreatedResponse({ type: EmptyBasketDto })
  @Post()
  creteBasket(@Body() { storeId }: NewBasketStoreIdDto): Promise<EmptyBasketDto> {
    return this.basketService.createNewEmptyBasket(storeId);
  }

  @ApiOkResponse({ type: BasketDetailsDto })
  @Get(':id')
  getBasketDetails(@Param() { id }: IdDto): Promise<BasketDetailsDto> {
    return this.basketService.getBasketDetails(id);
  }
}
