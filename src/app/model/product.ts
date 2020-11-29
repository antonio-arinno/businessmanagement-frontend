import { Provider } from './provider';
import { IvaType } from './iva-type.enum';

export class Product {

  id: number;
  provider: Provider;
  code: string;
  description: string;
  price: number;
  ivaType: IvaType;
}
