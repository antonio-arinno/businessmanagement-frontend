import { Customer } from './customer';
import { InvoiceItem } from './invoice-item';

export class Invoice {

  id: number;
  number: number;
  customer: Customer;
  createAt: string;
  observation: string;
  items: Array<InvoiceItem> = [];
  total: number;
  prueba: string;

  getTotal():number {
    this.total= 0
    this.items.forEach((item: InvoiceItem) => {
      this.total += item.price * item.quantity;
    });
    return this.total;
  }

}
