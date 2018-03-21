import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfigurationService } from '../../services/configuration.service';
import { SectionService } from '../../services/section.service';
import { RowService } from '../../services/row.service';
import { EventInformationService } from '../../services/event-information.service';
import { EventService } from '../../services/event.service';
import { Configuration } from '../../models/configurations';
import { Section } from '../../models/section';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-rows',
  templateUrl: './add-rows.component.html',
  styleUrls: ['./add-rows.component.scss']
})
export class AddRowsComponent implements OnInit {
  public title: string;
	public configurations=[];//: Configuration;
	public idConfiguration:number;
	public idEvent:number;
	public idSection:number;
	public sections=[];//: Section;
	public name: string;
	public seats: string;
	public localidad: string;
	public sectionName: string;
	public rows=[];
	public aforo=[];
	public aforoTotal:number=0;
	public aforoSeccion:number=0;
	public generate=false;
	public message:string;
	public asistentes:number=0;
	closeResult: string;
	public event=[];
	public isLogin:boolean;
    public username:string;
    public emailUser:string;
    public uid:string;



  
  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _configurationService: ConfigurationService,
		private _sectionService: SectionService,
		private _rowService:RowService,
		private _eventInformationService: EventInformationService,
		private _modalService: NgbModal,
		private _eventService: EventService,
		private _authService: AuthService
  ) { }

  ngOnInit() {
	this.checkUser();
	this.getIdEvent();
	this.checkUser();	
	this.getConfigurations(this.idEvent);
	this.getAforo(this.idEvent);
	this.getRows(this.idEvent);
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
        //console.log(response);
				if(response.code == 200){
					this.event = response.data;
					console.log(this.event);
					//console.log(response.data);
				}else{
					//console.log(response );
				}
			},
			error => {
				console.log(<any>error);
			});
			//console.log(this.event.length);
  }

  onSubmit(){
		console.log("Submit");
		//this._router.navigate(['/home']);
		this.saveRow();
	}

	saveRow(){
		this.getIdEvent();
		this._rowService.saveRows(this.rows).subscribe(
			response=>{
				if (response.code==200){
					this._router.navigate(['/generate-tickets/'+this.idEvent]);
					//Generar Boletos
					this.generate=true;
					console.log("response");
				} else {
					console.log(response);
				}

			},
			error=>{
				console.log(<any>error);
			}
		);
	}

	getConfigurations(id:number){
		this._configurationService.getConfigurations(id).subscribe(
			response => {
				if(response.code == 200){
					this.configurations = response.data;
					//console.log(this.configurations);
				}else{
					this.message="no se ha encontrado configuraciones";
					//console.log(this.message);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	getSections(id:number){
		this._sectionService.getSections(id).subscribe(
			response => {
				if(response.code == 200){
					this.sections = response.data;
					console.log(this.sections);
				}else{
					this.message="no se ha encontrado configuraciones";
					console.log(this.message);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	selected(id:any) {
		console.log(id);
		this.asistentes=0;
		this.aforoSeccion=0;
		if (id!=null){
		    this.idConfiguration = id.idConfiguration;
		    this.getSections(this.idConfiguration);
		    this.localidad = id.name;
		    this.asistentes=id.seatsNumber;
		}else{
			//this.cities=[];
		}
  	}
	  
	  
  	selectedSection(id:any) {
		console.log(id);
		if (id!=null){
		    this.idSection = id.idSection;
		    this.sectionName = id.name;
		}else{
			//this.cities=[];
		}
  	}

	getIdEvent(){
		this._route.params.forEach((params: Params) => {
			let id = params['idEvent'];
			this.idEvent = id;
		});
	}

	addRowTable(nameRow:string, seatsNumber:string){
		console.log(name);
  		this.rows.push({"idRow":0, "localidad":this.localidad, "sectionName":this.sectionName, "rowName":nameRow, "seatsPerRow":seatsNumber, "idSection": this.idSection, "idConfiguration": this.idConfiguration});
		console.log(this.rows);
		//var newJsonFile = _.uniqBy(this.rows, 'name');
		//this.rows = newJsonFile;
		this.totalAforo();
	}
	deleteRow(row:any){
		console.log(row);
		this._rowService.deleteRow(row.idRow).subscribe(
			response => {
				if(response.code == 200){
					//this.aforo = response.data;
					console.log(response.message);
					//console.log(this.aforo);
					//console.log(response.data);
				}else{
					this.message="no se ha eliminado la fila";
					console.log(this.message);
				}
			},
			error => {
				console.log(<any>error);
			});
		
	}
	totalAforo(){
		this.aforoTotal=0;
		//console.log(this.rows);
		for(var i=0; i<this.rows.length; i++){
			//if(this.idSection=)
			this.aforoTotal = this.aforoTotal + parseInt(this.rows[i].seatsPerRow);
		}
		console.log(this.aforoTotal);
		
		this.aforoSeccion=0;
		console.log(this.idConfiguration);
		for(var i=0; i<this.rows.length; i++){
			if(this.idConfiguration==this.rows[i].idConfiguration){
				this.aforoSeccion = this.aforoSeccion + parseInt(this.rows[i].seatsPerRow);
			}
		}
		console.log(this.aforoSeccion);
	}

	//totalAforoSeccion(){

	//}

	getAforo(idEvent:number){
		this._eventInformationService.getAforo(idEvent).subscribe(
			response => {
				if(response.code == 200){
					this.aforo = response.data;
					//console.log(this.aforo);
					//console.log(response.data);
				}else{
					this.message="no se ha encontrado aforo";
					console.log(this.message);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	onDeleteRow(id:any){
		console.log(id);
		var indice = this.rows.indexOf(id);
		//console.log(indice);
		this.rows.splice(indice,1);
		this.totalAforo();
	}

	getRows(id:number){
		this._rowService.getRows(id).subscribe(
			response => {
				if(response.code == 200){
					this.rows = response.data;
					console.log(this.rows);
					//console.log(response.data);
				}else{
					this.message="no se ha encontrado aforo";
					console.log(this.message);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	open(content) {
		this._modalService.open(content).result.then((result) => {
				this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
		  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}
	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return  `with: ${reason}`;
		}
	}

}
