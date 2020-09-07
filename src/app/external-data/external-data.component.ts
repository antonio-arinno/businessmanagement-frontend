import { Component, OnInit } from '@angular/core';
import { ExtenalDataService } from '../services/extenal-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-external-data',
  templateUrl: './external-data.component.html'
})
export class ExternalDataComponent implements OnInit {

  private selectedFile: File;

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

}
