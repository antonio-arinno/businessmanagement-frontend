import { Provider } from './provider';
import { BuyOrderItem } from './buy-order-item';

export class BuyOrder {

  id: number;
  number: number;
  provider: Provider;
  createAt: string;
  observation: string;
  items: Array<BuyOrderItem> = [];

  getTotal():number {
    let total = 0;
    this.items.forEach((item: BuyOrderItem) => {
      total += item.getAmount();
    });
    return Math.round(total * 100)/100;
  }




}
