import { Customer } from './customer';
import { Order } from './order';

export class Invoice {

  id: number;
  number: number;
  customer: Customer;
  createAt: string;
  observation: string;
  items: Array<Order> = [];
  totalWithIva : number;

}
