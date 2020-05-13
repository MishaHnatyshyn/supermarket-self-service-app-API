import { HttpException, HttpStatus } from '@nestjs/common';

export default class BothProductIdAndBarcodeMissingException extends HttpException {
  constructor() {
    super('productId or barcode value is not provided.', HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
