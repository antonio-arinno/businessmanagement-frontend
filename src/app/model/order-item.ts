import { Product } from './product';

export class OrderItem {

  id: number;
  product: Product;
  price: number;
  discount : number = 0;
  quantity: number = 1;


  public getAmount(): number {
    return Math.round(((this.price - (this.price * (this.discount/100))) * this.quantity) * 100)/100
  }

}
