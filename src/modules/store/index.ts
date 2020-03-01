import { Module } from '@nestjs/common';
import DatabaseModule from '../database';
import storeProviders from './providers/store.providers';
import StoreController from './controllers/store.controller';
import StoreRepositoryService from './services/store-repository.service';
import StoreService from './services/store.service';

@Module({
  controllers: [StoreController],
  imports: [DatabaseModule],
  providers: [
    ...storeProviders,
    StoreRepositoryService,
    StoreService,
  ],
})

export default class StoreModule {}
