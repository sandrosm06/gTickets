import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Configuration } from '../../models/configurations';
import { ConfigurationService } from '../../services/configuration.service';
import { EventInformationService } from '../../services/event-information.service';
import * as _ from 'lodash';    

@Component({
  selector: 'app-add-configurations',
  templateUrl: './add-configurations.component.html',
  styleUrls: ['./add-configurations.component.scss']
})
export class AddConfigurationsComponent implements OnInit {
  public title: string;
	public configurations: Configuration;
	localidades=[];
	localidadesSel=[];
	name:string;
	seats:string;
	public idEvent:number;
	public aforo=[];
	public aforoTotal:number=0;
  public message:string;
  
  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _configurationService: ConfigurationService,
		private _eventInformationService: EventInformationService
  ) {
    this.configurations = new Configuration(0,'','',0);
   }

  ngOnInit() {
    this.getIdEvent();
		this.configurations.events_idEvent=this.idEvent;
		this.getAforo(this.idEvent);
		//this.aforoTotal=this.aforo.totalSeats;
		console.log(this.aforo);
  }
  onSubmit(){
		console.log("Submit");
		this.saveConfigurations();
		//this._router.navigate(['/sections']);
	}

	addConfigurationTable(nameConfig:string, seatsNumber){
		this.localidades.push({"name":nameConfig, "seats":seatsNumber, "idEvent":this.idEvent});
		//console.log(this.localidades);
		var newJsonFile = _.uniqBy(this.localidades, 'name');
		this.localidades = newJsonFile;

		//console.log(this.localidades.length);
		this.totalAforo();
		
	}
	totalAforo(){
		this.aforoTotal=0;
		for(var i=0; i<this.localidades.length; i++){
			//console.log(this.localidades[i].seats);
			this.aforoTotal = this.aforoTotal + parseInt(this.localidades[i].seats);
		}
		//console.log(this.aforoTotal);
	}

	onDeleteConfiguration(id:any){
		//console.log(id);
		var indice = this.localidades.indexOf(id);
		//console.log(indice);
		this.localidades.splice(indice,1);
		this.totalAforo();
	}
	cancelarConfirm(){

	}

	saveConfigurations(){
		console.log(this.localidades);

		this._configurationService.saveConfiguration(this.localidades).subscribe(
			response=>{
				if (response.code==200){
					this._router.navigate(['/add-sections/'+this.idEvent]);
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

	getIdEvent(){
		this._route.params.forEach((params: Params) => {
			let id = params['idEvent'];
			this.idEvent = id;
		});
	}

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

}
