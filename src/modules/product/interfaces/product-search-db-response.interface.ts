export default interface ProductSearchDbResponse {
  id: number;
  name: string;
  barcode: string;
  photo: string;
  price: number;
  quantity: number;
  currency_code: string;
  currency_name: string;
  category_id: number;
  category_name: string;
  producer_id: number;
  producer_name: string;
  unit_of_measure: string;
  total: string;
  min_price: string;
  max_price: string;
}
