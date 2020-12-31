import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductLot } from '../model/product-lot';
import { ProductLotService } from '../services/product-lot.service'
import { AuthService } from '../user/auth.service';


@Component({
  selector: 'app-product-lot',
  templateUrl: './product-lot.component.html'
})
export class ProductLotComponent implements OnInit {

  productsLots: ProductLot[];
  paginator: any;
  component= '/product-lot';


  constructor(private productLotService: ProductLotService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.productLotService.getProductsLots(page).subscribe(
        response => {
          this.productsLots = response.content as ProductLot[];
          this.paginator = response;
        });
      }
    );
  }

}
