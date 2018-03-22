import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Configuration } from '../../models/configurations';
import { ConfigurationService } from '../../services/configuration.service';
import { EventInformationService } from '../../services/event-information.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';



import * as _ from 'lodash';    

@Component({
  selector: 'app-add-configurations',
  templateUrl: './add-configurations.component.html',
  styleUrls: ['./add-configurations.component.scss']
})
export class AddConfigurationsComponent implements OnInit {
	public title: string;
	closeResult: string;

	public configurations: Configuration;
	public eventDetail=[];
	localidades=[];
	localidadesSel=[];
	name:string;
	seats:string;
	public idEvent:number;
	public aforo=[];
	public aforoTotal:number=0;
	public message:string;
	public event=[];
	public isLogin:boolean;
    public username:string;
    public emailUser:string;
    public uid:string;

  
  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _configurationService: ConfigurationService,
		private _modalService: NgbModal,
		private _eventInformationService: EventInformationService,
		private _eventService: EventService,
	    private _authService: AuthService,


  ) {
    this.configurations = new Configuration(0,'','',0);
   }

  ngOnInit() {
	    this.checkUser();
		this.getIdEvent();
		this.configurations.events_idEvent=this.idEvent;
		this.getAforo(this.idEvent);
		this.getEventDetail(this.idEvent);
		this.getConfigurations(this.idEvent);
		//this.aforoTotal=this.aforo.totalSeats;
		//console.log(this.aforo);
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
  onSubmit(){
		//console.log("Submit");
		this.saveConfigurations();
		//this._router.navigate(['/sections']);
	}

	addConfigurationTable(nameConfig:string, seatsNumber){
		//this.localidades.push({"name":nameConfig, "seats":seatsNumber, "idEvent":this.idEvent});
		this.localidades.push({"idConfiguration":0, "name":nameConfig, "seatsNumber":seatsNumber, "events_idEvent":this.idEvent});
		////console.log(this.localidades);
		var newJsonFile = _.uniqBy(this.localidades, 'name');
		this.localidades = newJsonFile;
		////console.log(this.localidades.length);
		this.totalAforo();	
	}
	totalAforo(){
		this.aforoTotal=0;
		for(var i=0; i<this.localidades.length; i++){
			////console.log(this.localidades[i].seats);
			//this.aforoTotal = this.aforoTotal + parseInt(this.localidades[i].seats);
			this.aforoTotal = this.aforoTotal + parseInt(this.localidades[i].seatsNumber);
		}
		////console.log(this.aforoTotal);
	}

	onDeleteConfiguration(id:any){
		////console.log(id);
		var indice = this.localidades.indexOf(id);
		////console.log(indice);
		this.localidades.splice(indice,1);
		this.totalAforo();
	}
	cancelarConfirm(){

	}

	saveConfigurations(){
		//console.log(this.localidades);

		this._configurationService.saveConfiguration(this.localidades).subscribe(
			response=>{
				if (response.code==200){
					this._router.navigate(['/add-sections/'+this.idEvent]);
					//console.log("response");
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

	getAforo(idEvent:number){
		this._eventInformationService.getAforo(idEvent).subscribe(
			response => {
				if(response.code == 200){
					this.aforo = response.data;
					////console.log(this.aforo);
					////console.log(response.data);
				}else{
					this.message="no se ha encontrado aforo";
					//console.log(this.message);
				}
			},
			error => {
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

	getConfigurations(idEvent:number){
		this._configurationService.getConfigurations(idEvent).subscribe(
			response => {
				if(response.code == 200){
					this.localidades = response.data;
					this.totalAforo();
					//console.log(this.localidades);
					////console.log(response.data);
				}else{
					this.message="no se ha encontrado aforo";
					//console.log(this.message);
				}
			},
			error => {
				//console.log(<any>error);
			}
		);
		

	}



	borrarConfirm(config:any){
		this._configurationService.deleteConfiguration(config.idConfiguration).subscribe(
			response => {
				if(response.code == 200){
					//console.log(response.message);
				}else{
					//console.log(response.message);
				}
			},
			error => {
				//console.log(<any>error);
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
