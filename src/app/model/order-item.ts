import { Product } from './product';
import { IvaType } from './iva-type.enum';

export class OrderItem {

  id: number;
  product: Product;
  price: number;
  discount : number = 0;
  quantity: number = 1;
  iva: number;
  ivaType: IvaType;
  lot: String;
  lots: String[] = [];

  public getAmount(): number {
    return Math.round(((this.price - (this.price * (this.discount/100))) * this.quantity) * 100)/100
  }

}
