import {HttpException, HttpStatus} from '@nestjs/common';

export default class EmailUniquenessException extends HttpException {
  constructor() {
    super('User with such email already exists.', HttpStatus.BAD_REQUEST);
  }
}
