import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import BasketService from '../services/basket.service';
import AddToBasketDto from '../dto/add-to-basket.dto';
import LineItemDto from '../dto/line-item.dto';
import IdDto from '../../../shared/dto/id.dto';
import UpdateQuantityDto from '../dto/update-quantity.dto';
import BothProductIdAndBarcodeMissingException from '../exceptions/both-productId-and-barcode-missing.exception';

@ApiUseTags('basket-items')
@Controller('basket-items')
export default class BasketLineItemController {
  constructor(private basketService: BasketService) {}

  @ApiCreatedResponse({ type: LineItemDto })
  @Post()
  createBasketLineItem(
    @Body() { basketId, productId, quantity, barcode }: AddToBasketDto,
  ): Promise<LineItemDto> {
    if (!basketId && !barcode) {
      throw new BothProductIdAndBarcodeMissingException();
    }
    return this.basketService.createBasketLineItem(basketId, productId, quantity, barcode);
  }

  @ApiOkResponse({ type: LineItemDto })
  @Put(':id')
  updateLineItemQuantity(
    @Param() { id }: IdDto,
      @Body() { quantity }: UpdateQuantityDto,
  ): Promise<LineItemDto> {
    return this.basketService.updateLineItemQuantity(id, quantity);
  }

  @ApiOkResponse({ type: LineItemDto })
  @Delete(':id')
  deleteBasketLineItem(@Param() { id }: IdDto): Promise<LineItemDto> {
    return this.basketService.deleteLineItem(id);
  }
}
