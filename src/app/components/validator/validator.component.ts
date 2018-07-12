import { Component, OnInit } from '@angular/core';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'app-validator',
  templateUrl: './validator.component.html',
  styleUrls: ['./validator.component.scss']
})
export class ValidatorComponent implements OnInit {
  mymodel:string;
  url:string
  isValid:boolean;
  constructor(
    private _validatorService:ValidatorService
  ) { }

  ngOnInit() {
  }


  validar(ticketNumber:any){
    this._validatorService.validar(ticketNumber.target.value).subscribe(
			response=>{
				if (response.code==200){
					var data = response.data;
          this.isValid=true;
					console.log("data",data);
				} else {
          //console.log(response.status);
          this.isValid=false;
				}

			},
			error=>{
				//console.log(<any>error);
			}
		);
  }

  validar2(){
    
    this._validatorService.validar(this.mymodel).subscribe(
			response=>{
				if (response.code==200){
					var data = response.data;
          this.isValid=true;
					console.log("data",data);
				} else {
          //console.log(response.status);
          this.isValid=false;
				}

			},
			error=>{
				//console.log(<any>error);
			}
		);
  }

  clear(){
    this.mymodel="";
    this.isValid=false;
  }
}
