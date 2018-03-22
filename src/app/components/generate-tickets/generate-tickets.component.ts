import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GenerateService } from '../../services/generate.service';
import { ExcelService } from '../../services/excel.service';
import { Configuration } from '../../models/configurations';
import { Section } from '../../models/section';
import { EventInformationService } from '../../services/event-information.service';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-generate-tickets',
  templateUrl: './generate-tickets.component.html',
  styleUrls: ['./generate-tickets.component.scss']
})
export class GenerateTicketsComponent implements OnInit {

	public idEvent:number;
	public eventDetail=[];

	public configurationSection=[];
	public rows=[];
	public message:string;
	//public isGenerated:boolean = false;
	public idGenerated=[];
	public event=[];
	public isLogin:boolean;
    public username:string;
    public emailUser:string;
    public uid:string;
	//@Input() idConfiguration:number;

  constructor(
    private _route: ActivatedRoute,
	private _router: Router,
	private _generateService: GenerateService,
	private _excelService: ExcelService,
	private _eventInformationService: EventInformationService,
	private _authService: AuthService,
	private _eventService: EventService
  ) { }

  ngOnInit() {
	this.checkUser();
    this.getIdEvent();
	this.getRows();
	this.getRowsGenerated();
	this.getEventDetail(this.idEvent);
	this.getVenue();
  }
  checkUser(){
	    this._authService.getAuth().subscribe( auth => {
	        if(auth){
	          this.isLogin = true;
	          this.username = auth.displayName;
	          this.emailUser = auth.email;
	          this.uid = auth.uid;
	          
	        }else{
	          this.isLogin = false;
	        }
	      });
	  }
  getVenue(){
    this._eventService.getEventDetail(this.idEvent).subscribe(
			response => {
        ////console.log(response);
				if(response.code == 200){
					this.event = response.data;
					//console.log(this.event);
					////console.log(response.data);
				}else{
					////console.log(response );
				}
			},
			error => {
				//console.log(<any>error);
			});
			////console.log(this.event.length);
  }

  getRows(){
		this._generateService.getRows(this.idEvent).subscribe(
			result => {
				
				if(result.code = 200){
					//console.log(result);
					this.rows=result.data;
				}else{
					
					this.message=result.message;
					//console.log(this.message);
				}

			},
			error => {
				//console.log(<any>error);
			}
		);
	}

	generarTickets(row){
		//console.log(row);
		this._generateService.generateTicekts(row).subscribe(
			response=>{
				if (response.code==200){
					//this._router.navigate(['/add-sections/'+this.idEvent]);
					//this.isGenerated=true;
					this.idGenerated.push(row.idRow);
					//console.log(this.idGenerated);
					////console.log(response);
					//this.isGenerated(row.idRow);
				} else {
					//console.log(response);
				}

			},
			error=>{
				//console.log(<any>error);
			}
		);
	}

	generarArchivo(row){
		var tickets=[];
		this._generateService.getTickets(row).subscribe(
			response=>{
				if (response.code==200){
					//console.log(response.data);
					this._excelService.exportAsExcelFile(response.data,"tickets-01");
					tickets = response.data;
				} else {
					//console.log(response);
				}

			},
			error=>{
				//console.log(<any>error);
			}
		);

		
		
	}

	getIdEvent(){
		this._route.params.forEach((params: Params) => {
			let id = params['idEvent'];
			this.idEvent = id;
		});
	}

	isGenerated(idRow:number){
		var retorna=false;
		for (var i = 0; i < this.idGenerated.length; i++) {

			if (this.idGenerated[i] == idRow) {
				////console.log("retorna true");
				////console.log(this.idGenerated[i]);
				retorna=true;
				
			}
		}
		////console.log(retorna);
		return retorna;

	}

	isTicketsGenerated(idRow:number){
		var retorna=false;
		this._generateService.isTicketsGenerated(idRow).subscribe(
			response=>{
				if (response.code==200){
					retorna = true;
					//console.log(retorna);
					
				} else {
					retorna = false;
					//console.log(retorna);
				}

			},
			error=>{
				//console.log(<any>error);
			}
		);
		return retorna;

	}

	getRowsGenerated(){
		this._generateService.getRowsGenerated().subscribe(
			response=>{
				if (response.code==200){
					var data = response.data;

					for(var i=0; i<data.length; i++){
						this.idGenerated.push(data[i].Rows_idRow);
					}
				} else {
					//console.log(response.status);
				}

			},
			error=>{
				//console.log(<any>error);
			}
		);

	}
	getEventDetail(idEvent:number){
		this._eventInformationService.getEventDetail(idEvent).subscribe(
			response => {
				if(response.code == 200){
					this.eventDetail = response.data;
					////console.log(this.aforo);
					////console.log(response.data);
				}else{
					this.message="no se ha encontrado informacion de evento";
					//console.log(this.message);
				}
			},
			error => {
				//console.log(<any>error);
			}
		);
	}

}
