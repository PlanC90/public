import { products } from '../data/products';
import { Product } from '../types/product';

export const findProductByBarcode = (barcode: string): Product | null => {
  return products.find(p => p.barcode === barcode) || null;
};