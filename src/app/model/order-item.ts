import { Product } from './product';

export class OrderItem {

  id: number;
  product: Product;
  quantity: number = 1;
  price: number;


  public getAmount():number {
    return this.price * this.quantity;
  }

}
