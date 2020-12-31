import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InputDirectStore } from '../model/input-direct-store';
import { InputDirectStoreService } from '../services/input-direct-store.service';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-input-direct-store',
  templateUrl: './input-direct-store.component.html'
})
export class InputDirectStoreComponent implements OnInit {

  inputsDirectsStore: InputDirectStore[];
  paginator: any;
  component= '/input-direct-store';

  constructor(private inputDirectStoreService: InputDirectStoreService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.inputDirectStoreService.getInputsDirectsStore(page).subscribe(
        response => {
          this.inputsDirectsStore = response.content as InputDirectStore[];
          this.paginator = response;
        });
      }
    );
  }


}
