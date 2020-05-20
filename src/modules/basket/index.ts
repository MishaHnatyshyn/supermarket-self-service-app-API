import { Module } from '@nestjs/common';
import DatabaseModule from '../database';
import basketProviders from './providers/basket.providers';
import BasketRepositoryService from './services/basket-repository.service';
import BasketService from './services/basket.service';
import BasketController from './controllers/basket.controller';
import BasketLineItemController from './controllers/basket-line-item.controller';
import ProductModule from '../product';

@Module({
  imports: [
    DatabaseModule,
    ProductModule,
  ],
  providers: [
    ...basketProviders,
    BasketRepositoryService,
    BasketService,
  ],
  controllers: [
    BasketController,
    BasketLineItemController,
  ],
  exports: [BasketService],
})

export default class BasketModule {}
