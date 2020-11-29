import { IvaType } from './iva-type.enum';

export class Iva {

  public getIva(ivaType: IvaType): number{

    console.log(ivaType);
    console.log(IvaType.General);

    if(ivaType == IvaType.General){
      return 21
    }else
      if(ivaType == IvaType.Reduced){
        return 10
      } else
        if(ivaType == IvaType["Super Reduced"]){
          return 4
        }else{
          return 99
        }
  }

}
