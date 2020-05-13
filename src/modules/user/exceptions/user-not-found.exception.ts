import NotFoundException from '../../../shared/not-found.exception';

export default class UserNotFoundException extends NotFoundException {
  constructor(id: number) {
    super({ resource: 'User', queryType: 'id', queryValue: id });
  }
}
