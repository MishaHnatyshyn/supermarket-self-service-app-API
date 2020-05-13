import { HttpException, HttpStatus } from '@nestjs/common';

export default class ProductNotFoundException extends HttpException {
  constructor({ id, barcode }: { id?: number; barcode?: string }) {
    const queryType = id ? 'id' : 'barcode';
    super(`Product with ${queryType} "${id || barcode}" does't exist.`, HttpStatus.NOT_FOUND);
  }
}
