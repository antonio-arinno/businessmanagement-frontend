import { Customer } from './customer';
import { OrderItem } from './order-item';
import { Invoice } from './invoice';


export class Order {

  id: number;
  number: number;
  customer: Customer;
  createAt: string;
  invoice: Invoice;
  observation: string;
  items: Array<OrderItem> = [];

  getTotal():number {
    let total = 0;
    this.items.forEach((item: OrderItem) => {
      total += item.getAmount();
//      total += item.price * item.quantity;
    });
    return Math.round(total * 100)/100
  }


}
