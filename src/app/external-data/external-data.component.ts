import { Component, OnInit } from '@angular/core';
import { ExtenalDataService } from '../services/extenal-data.service';
import { HttpEventType } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-external-data',
  templateUrl: './external-data.component.html'
})
export class ExternalDataComponent implements OnInit {

  private selectedFile: File;
  public fileNameProduct: string = 'Load Product';
  public fileNameCustomer: string = 'Load Customer';
  public progressCustomer: number = 0;

  public progreso: number = 0;

  constructor(private extenalDataService: ExtenalDataService) { }

  ngOnInit(): void {
  }

  selectFileCustomer(event){
    this.selectedFile = event.target.files[0];
    this.fileNameCustomer = this.selectedFile.name;
    this.progressCustomer = 0;

  }

  selectFileProduct(event){
    this.selectedFile = event.target.files[0];
    this.fileNameProduct = this.selectedFile.name;
    this.progreso = 0;
  }

  uploadFileCustomer(){
    this.extenalDataService.uploadFileCustomer(this.selectedFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress){
          this.progressCustomer = Math.round((event.loaded / event.total) * 100)/2;

        } else if(event.type === HttpEventType.Response){
          this.progressCustomer = 100;
          let response: any = event.body;
          Swal.fire(response.title , response.message, 'success');
        }
      },err => {
        Swal.fire(err.error.error, err.error.message, 'error')
      }
    );
  }

  uploadFileProduct(){
    this.extenalDataService.uploadFileProduct(this.selectedFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded / event.total) * 100)/2;
          console.log(event.loaded + ' - ' + event.total);
        } else if(event.type === HttpEventType.Response){
          this.progreso = 100;
          let response: any = event.body;
          Swal.fire(response.title , response.message,  'success');
        }
      },err => {
        Swal.fire(err.error.error, err.error.message, 'error')
      }
    );
  }

}
