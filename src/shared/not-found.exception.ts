import { HttpException, HttpStatus } from '@nestjs/common';

export interface NotFoundExceptionInterface {
  resource: string;
  queryType: string;
  queryValue: string | number;
}

export default class NotFoundException extends HttpException {
  constructor({ resource, queryType, queryValue }: NotFoundExceptionInterface) {
    super(`${resource} with ${queryType} "${queryValue}" does't exist.`, HttpStatus.NOT_FOUND);
  }
}
