import { HttpException, HttpStatus } from '@nestjs/common';

export default class InvalidDueDateException extends HttpException {
  constructor() {
    super('Invalid due date', HttpStatus.BAD_REQUEST);
  }
}
