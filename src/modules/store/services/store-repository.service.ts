import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import BaseRepositoryService from '../../../shared/base-repository.service';
import { STORE_REPOSITORY } from '../../../constants';
import Store from '../../database/entities/store/store.entity';
import StoreDto from '../dto/store.dto';

@Injectable()
export default class StoreRepositoryService extends BaseRepositoryService<Store> {
  constructor(
    @Inject(STORE_REPOSITORY)
    private readonly storeRepository: Repository<Store>,
  ) {
    super(storeRepository);
  }

  getAll(): Promise<StoreDto[]> {
    return this.storeRepository.find({
      relations: ['address', 'address.country', 'address.country.country', 'address.coordinates'],
    });
  }

  getNameAndAddress(id: number): Promise<Store> {
    return this.storeRepository.findOne(id, {
      select: ['name', 'id', 'address'],
      relations: ['address', 'address.country', 'address.country.country'],
    });
  }
}
