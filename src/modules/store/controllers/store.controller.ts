import {
  Controller, Get,
} from '@nestjs/common';
import {ApiOkResponse, ApiUseTags} from '@nestjs/swagger';
import StoreService from '../services/store.service';
import StoreDto from '../dto/store.dto';

@ApiUseTags('stores')
@Controller('stores')
export default class StoreController {
  constructor(private storeService: StoreService) {}

  @ApiOkResponse({ type: [StoreDto] })
  @Get()
  getAllStores(): Promise<StoreDto[]> {
    return this.storeService.getStores();
  }
}
