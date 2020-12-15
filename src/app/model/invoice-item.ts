import { Product } from './product';

export class InvoiceItem {

  id: number;
  product: Product;
  quantity: number = 1;
  price: number;
  amount: number;
  observation: string;

  public getAmount():number {
    return this.product.salePrice * this.quantity;
  }

}
