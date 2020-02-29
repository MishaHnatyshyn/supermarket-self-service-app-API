import { Module } from '@nestjs/common';
import DatabaseModule from '../database';
import basketProviders from './providers/basket.providers';
import BasketRepositoryService from './services/basket-repository.service';
import BasketService from './services/basket.service';
import BasketController from './controllers/basket.controller';
import BasketLineItemController from './controllers/basket-line-item.controller';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...basketProviders,
    BasketRepositoryService,
    BasketService,
  ],
  controllers: [
    BasketController,
    BasketLineItemController,
  ],
  exports: [],
})

export default class BasketModule {}