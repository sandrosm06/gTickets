import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ConfigurationService } from '../../services/configuration.service';
import { EventInformationService } from '../../services/event-information.service';
import { Configuration } from '../../models/configurations';
import { FlashMessagesService } from 'angular2-flash-messages';





@Component({
  selector: 'app-edit-configurations',
  //templateUrl: '../add-configurations/add-configurations.component.html',
  templateUrl: './edit-configurations.component.html',
  styleUrls: ['./edit-configurations.component.scss']
})
export class EditConfigurationsComponent implements OnInit {
  public configurations=[];//: Configuration;
  public message:string;
  public eventDetail=[];
	public idEvent:number;
  public aforo=[];
  public aforoTotal:number=0;
  localidades=[];


  constructor(
    private _configurationService: ConfigurationService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _eventInformationService: EventInformationService,
    private _flashMessage: FlashMessagesService

  ) {
    //this.configurations = new Configuration(0,'','',0);

   }

  ngOnInit() {
    this.getIdEvent();
		//this.configurations.events_idEvent=this.idEvent;
		this.getAforo(this.idEvent);
    this.getEventDetail(this.idEvent);
    this.getConfigurations(this.idEvent);
    
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
  getEventDetail(idEvent:number){
		this._eventInformationService.getEventDetail(idEvent).subscribe(
			response => {
				if(response.code == 200){
					this.eventDetail = response.data;
				}else{
					this._flashMessage.show('No se ha encontrado información del evento', {cssClass: 'alert-success', timeout: 4000});
					console.log(this.message);
				}
			},
			error => {
				console.log(<any>error);
			}
		);
  }

  getConfigurations(idEvent:number){
    this._configurationService.getConfigurations(idEvent).subscribe(
			response => {
				if(response.code == 200){
					this.configurations = response.data;
          console.log(this.configurations);
          this.totalAforo();
					//console.log(response.data);
				}else{
					this.message="no se ha encontrado aforo";
					console.log(this.message);
				}
			},
			error => {
				console.log(<any>error);
		});
  }

  updateConfiguration(configuration:any){
    console.log(this.aforo[0].totalSeats);
    console.log(this.aforoTotal);
    if (this.aforoTotal <= parseInt(this.aforo[0].totalSeats)) {
      this._configurationService.updateConfiguration(configuration).subscribe(
        response=>{
          if (response.code==200){
            this._flashMessage.show('Se ha actualuzado el registro Correctamente', {cssClass: 'alert-success', timeout: 4000});
            //this._router.navigate(['/generate-tickets/'+this.idEvent]);
            //Generar Boletos
            console.log("Actualizado");
          } else {
            console.log(response);
            this._flashMessage.show('El registro no se ha atualizado', {cssClass: 'alert-success', timeout: 4000});
          }

        },
        error=>{
          console.log(<any>error);
        });
      }else{
        this._flashMessage.show('ERROR! en el Aforo Configurado', {cssClass: 'alert-danger', timeout: 5000});
      }
  }
  deleteConfiguration(configuration:any){
    console.log(configuration);
  }

  totalAforo(){
    this.aforoTotal=0;
    console.log(this.configurations);
		for(var i=0; i<this.configurations.length; i++){
			//console.log(this.localidades[i].seatsNumber);
			this.aforoTotal = this.aforoTotal + parseInt(this.configurations[i].seatsNumber);
		}
		//console.log(this.aforoTotal);
  }
  
  
}
