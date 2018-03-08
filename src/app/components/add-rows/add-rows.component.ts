import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfigurationService } from '../../services/configuration.service';
import { SectionService } from '../../services/section.service';
import { RowService } from '../../services/row.service';
import { EventInformationService } from '../../services/event-information.service';
import { Configuration } from '../../models/configurations';
import { Section } from '../../models/section';

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
  
  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _configurationService: ConfigurationService,
		private _sectionService: SectionService,
		private _rowService:RowService,
		private _eventInformationService: EventInformationService
  ) { }

  ngOnInit() {
    this.getIdEvent();
		this.getConfigurations(this.idEvent);
		this.getAforo(this.idEvent);
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
  		this.rows.push({"localidad":this.localidad, "seccion":this.sectionName, "name":nameRow, "seats":seatsNumber, "idSection": this.idSection});
		console.log(this.rows);
		//var newJsonFile = _.uniqBy(this.rows, 'name');
		//this.rows = newJsonFile;
		this.totalAforo();
	}

	totalAforo(){
		this.aforoTotal=0;
		//console.log(this.rows);
		for(var i=0; i<this.rows.length; i++){
			//if(this.idSection=)
			this.aforoTotal = this.aforoTotal + parseInt(this.rows[i].seats);
		}
		console.log(this.aforoTotal);
		
		this.aforoSeccion=0;
		//console.log(this.rows);
		for(var i=0; i<this.rows.length; i++){
			if(this.idSection==this.rows[i].idSection){
				this.aforoSeccion = this.aforoSeccion + parseInt(this.rows[i].seats);
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

}
