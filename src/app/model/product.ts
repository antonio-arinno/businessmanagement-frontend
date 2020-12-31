import { Provider } from './provider';
import { IvaType } from './iva-type.enum';
import { ProductLot } from './product-lot';

export class Product {

  id: number;
  provider: Provider;
  code: string;
  description: string;
  buyPrice: number;
  salePrice: number;
  ivaType: IvaType;
  stock: number;

  items: Array<ProductLot> = [];

}
