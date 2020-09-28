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
  public progreso: number = 0;


  constructor(private extenalDataService: ExtenalDataService) { }

  ngOnInit(): void {
  }

  selectFile(event){
    this.selectedFile = event.target.files[0];
  }

  uploadFile(){
    this.extenalDataService.uploadFile(this.selectedFile).subscribe(
      response => {
        Swal.fire(response.title , response.message,  'success');
      },err => {
        Swal.fire(err.error.error, err.error.message, 'error')
      }
    );
  }

  uploadFileProduct(){
    this.progreso = 0;
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
