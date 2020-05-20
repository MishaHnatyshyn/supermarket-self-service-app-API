import NotFoundException from '../../../shared/not-found.exception';

export default class OrderNotFoundException extends NotFoundException {
  constructor(id: number) {
    super({ resource: 'Order', queryType: 'id', queryValue: id });
  }
}
