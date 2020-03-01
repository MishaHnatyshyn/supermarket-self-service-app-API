import { Injectable } from '@nestjs/common';
import StoreRepositoryService from './store-repository.service';
import StoreDto from '../dto/store.dto';

@Injectable()
export default class StoreService {
  constructor(private readonly storeRepositoryService: StoreRepositoryService) {}

  getStores(): Promise<StoreDto[]>  {
    return this.storeRepositoryService.getAll();
  }
}
