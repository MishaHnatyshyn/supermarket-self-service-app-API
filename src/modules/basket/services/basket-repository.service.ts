import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import BaseRepositoryService from '../../../shared/base-repository.service';
import { BASKET_LINE_ITEM_REPOSITORY, BASKET_REPOSITORY } from '../../../constants';
import Basket from '../../database/entities/basket/basket.entity';
import BasketLineItem from '../../database/entities/basket/basket-line-item.entity';
import Product from '../../database/entities/product/product.entity';
import LineItemDetails from '../interfaces/line-item-details.interface';
import { BasketStatus } from '../interfaces/status.enum';
import { SelectQueryBuilder } from 'typeorm/query-builder/SelectQueryBuilder';
import ProductPhoto from '../../database/entities/product/product-photo.entity';

@Injectable()
export default class BasketRepositoryService extends BaseRepositoryService<Basket> {
  constructor(
    @Inject(BASKET_REPOSITORY)
    private readonly basketRepository: Repository<Basket>,
    @Inject(BASKET_LINE_ITEM_REPOSITORY)
    private readonly basketLineItemRepository: Repository<BasketLineItem>,
  ) {
    super(basketRepository);
  }

  createEmptyBasket(storeId, userId): Promise<Basket> {
    const basket = new Basket();
    basket.user_id = userId;
    basket.store_id = storeId;
    basket.status = BasketStatus.IN_PROGRESS;
    return this.basketRepository.save(basket);
  }

  createBasketLineItem(
    basketId: number,
    productId: number,
    quantity: number,
  ): Promise<BasketLineItem> {
    const lineItem = new BasketLineItem();
    lineItem.basket_id = basketId;
    lineItem.product_id = productId;
    lineItem.quantity = quantity;
    return this.basketLineItemRepository.save(lineItem);
  }

  getBasketLineItemsPrices(
    basketId: number,
  ): Promise<{ id: number; quantity: number; price: number }[]> {
    return this.basketLineItemRepository
      .createQueryBuilder('item')
      .select([
        'item.id as id',
        'item.quantity as quantity',
        'product.price as price',
      ])
      .where({ basket_id: basketId })
      .innerJoin(Product, 'product', 'product.id=item.product_id')
      .getRawMany();
  }

  private getLineItemDetailsBaseQuery(): SelectQueryBuilder<BasketLineItem> {
    return this.basketLineItemRepository
      .createQueryBuilder('item')
      .select([
        'item.id as id',
        'product.id as product',
        'product.name as name',
        'product.description as description',
        'product.price as price',
        'photo.url as photo',
        'item.quantity as quantity',
        'product.price * item.quantity as sum',
      ])
      .innerJoin(Product, 'product', 'product.id=item.product_id')
      .leftJoin(ProductPhoto, 'photo', 'product.id=photo.product_id AND photo.is_main = TRUE');
  }

  getBasketLineItemsDetails(basketId: number): Promise<LineItemDetails[]> {
    const baseQuery = this.getLineItemDetailsBaseQuery();
    return baseQuery.where({ basket_id: basketId }).getRawMany();
  }

  getSingleBasketLineItemDetails(lineItemId: number): Promise<LineItemDetails> {
    const baseQuery = this.getLineItemDetailsBaseQuery();
    return baseQuery.where({ id: lineItemId }).getRawOne();
  }

  getLineItemBasketId(lineItemId: number): Promise<{ basket_id: number }> {
    return this.basketLineItemRepository.findOne(lineItemId, { select: ['basket_id'] });
  }

  updateLineItemQuantity(id, quantity): Promise<UpdateResult> {
    return this.basketLineItemRepository.update(id, { quantity });
  }

  deleteLineItem(id): Promise<DeleteResult> {
    return this.basketLineItemRepository.delete(id);
  }

  async getBasketStoreId(basketId: number): Promise<number> {
    const basket = await this.basketRepository.findOne(basketId, { select: ['store_id']});
    return basket.store_id;
  }
}
