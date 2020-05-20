import { Injectable } from '@nestjs/common';
import StoreRepositoryService from './store-repository.service';
import StoreDto from '../dto/store.dto';
import Store from '../../database/entities/store/store.entity';

@Injectable()
export default class StoreService {
  constructor(private readonly storeRepositoryService: StoreRepositoryService) {}

  getStores(): Promise<StoreDto[]>  {
    return this.storeRepositoryService.getAll();
  }

  getStoreShortDetails(storeId: number): Promise<Store> {
    return this.storeRepositoryService.getNameAndAddress(storeId);
  }
}
