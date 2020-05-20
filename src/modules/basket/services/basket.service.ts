import { Injectable } from '@nestjs/common';
import BasketRepositoryService from './basket-repository.service';
import EmptyBasketDto from '../dto/empty-basket.dto';
import BasketTotals from '../interfaces/basket-totals.interface';
import LineItemDetails from '../interfaces/line-item-details.interface';
import BasketLineItem from '../../database/entities/basket/basket-line-item.entity';
import LineItemDto from '../dto/line-item.dto';
import BasketDetailsDto from '../dto/basket-details.dto';
import ProductService from '../../product/services/product.service';

@Injectable()
export default class BasketService {
  constructor(
    private readonly basketRepositoryService: BasketRepositoryService,
    private readonly productService: ProductService,
  ) {}

  async createNewEmptyBasket(storeId: number, userId: number = null): Promise<EmptyBasketDto> {
    const basketEntity = await this.basketRepositoryService.createEmptyBasket(storeId, userId);
    const { created_at, id, ...rest } = basketEntity;
    const basketResponseData: EmptyBasketDto = { id, createdAt: created_at };
    return basketResponseData;
  }

  async getBasketTotals(basketId: number): Promise<BasketTotals> {
    const productsPrices = await this.basketRepositoryService.getBasketLineItemsPrices(basketId);
    const { sum, items } = productsPrices.reduce((acc, curr) => {
      acc.sum += curr.price * curr.quantity;
      acc.items += + curr.quantity;
      return acc;
    }, { sum: 0, items: 0 });
    return { total: sum, items, products: productsPrices.length };
  }

  async getLineItemDetails(lineItemId: number): Promise<LineItemDetails> {
    return this.basketRepositoryService.getSingleBasketLineItemDetails(lineItemId);
  }

  async createBasketLineItem(
    basketId: number,
    productId: number,
    quantity = 1,
    barcode: string,
  ): Promise<LineItemDto> {
    let populatedProductId = null;
    if (!productId && barcode) {
      const product = await this.productService.getProductByBarcode(barcode);
      populatedProductId = product.id;
    }
    const lineItem: BasketLineItem = await this.basketRepositoryService.createBasketLineItem(
      basketId,
      productId || populatedProductId,
      quantity,
    );
    const lineItemDetails: LineItemDetails = await this.getLineItemDetails(lineItem.id);
    const updatedBasketTotals: BasketTotals = await this.getBasketTotals(basketId);
    const response: LineItemDto = {
      data: lineItemDetails,
      updatedBasketTotals,
    };
    return response;
  }

  async updateLineItemQuantity(lineItemId: number, quantity: number): Promise<LineItemDto> {
    if (quantity === 0) {
      return this.deleteLineItem(lineItemId);
    }
    await this.basketRepositoryService.updateLineItemQuantity(lineItemId, quantity);
    const updatedLineItem = await this.getLineItemDetails(lineItemId);
    const { basket_id: basketId } = await this.basketRepositoryService.getLineItemBasketId(
      lineItemId,
    );
    const updatedBasketTotals: BasketTotals = await this.getBasketTotals(basketId);
    const response: LineItemDto = {
      data: updatedLineItem,
      updatedBasketTotals,
    };
    return response;
  }

  async deleteLineItem(lineItemId: number): Promise<LineItemDto> {
    const { basket_id: basketId } = await this.basketRepositoryService.getLineItemBasketId(
      lineItemId,
    );
    await this.basketRepositoryService.deleteLineItem(lineItemId);
    const updatedBasketTotals: BasketTotals = await this.getBasketTotals(basketId);
    const response = {
      data: null,
      updatedBasketTotals,
    };
    return response;
  }

  async getBasketDetails(basketId: number): Promise<BasketDetailsDto> {
    const lineItems = await this.basketRepositoryService.getBasketLineItemsDetails(basketId);
    const storeId = await this.basketRepositoryService.getBasketStoreId(basketId);
    const totals = await this.getBasketTotals(basketId);
    return {
      id: basketId,
      data: lineItems,
      totals,
      storeId,
    };
  }
}
