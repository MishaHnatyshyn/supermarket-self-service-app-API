import { HttpException, HttpStatus } from '@nestjs/common';

export default class ProductNotFoundException extends HttpException {
  constructor(id: number) {
    super(`Product with id "${id}" does't exist.`, HttpStatus.NOT_FOUND);
  }
}
