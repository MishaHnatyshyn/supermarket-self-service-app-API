import NotFoundException from '../../../shared/not-found.exception';

export default class ProductNotFoundException extends NotFoundException {
  constructor({ id, barcode }: { id?: number; barcode?: string }) {
    const queryType = id ? 'id' : 'barcode';
    super({ resource: 'Product', queryType, queryValue: id || barcode});
  }
}
