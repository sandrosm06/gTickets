import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SectionService } from '../../services/section.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Configuration } from '../../models/configurations';
import { Section } from '../../models/section';
import { EventService } from '../../services/event.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent implements OnInit {
  public title: string;
	public sections: Section;
	public configurations=[];// Configuration;
	public idEvent:number;
	public idConfiguration:number;
	sectionsConf=[];
	//public name:string;
	public localidad:string;
	public message:string;
	closeResult: string;
	public event=[];
  
  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _sectionService: SectionService,
		private _modalService: NgbModal,
		private _configurationService: ConfigurationService,
		private _eventService: EventService
  ) {
    this.sections = new Section(0,'',0);
   }

  ngOnInit() {
    this.getIdEvent();
		this.getConfigurations(this.idEvent);
		this.getSections();
		this.getVenue();

  }
  onSubmit(){
		console.log("Submit");
		this.saveSection();
		//this._router.navigate(['/configurations');
		
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

	saveSection(){
		console.log(this.sectionsConf);
		this.getIdEvent();
		this._sectionService.saveSection(this.sectionsConf).subscribe(
			response=>{
				if (response.code==200){
					this._router.navigate(['/add-rows/'+this.idEvent]);
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

	//getConfigurations(idEvent:number){
	getConfigurations(id:number){
		this._configurationService.getConfigurations(id).subscribe(
			response => {
				if(response.code == 200){
					this.configurations = response.data;
					console.log(this.configurations);
				}else{
					this.message="no se ha encontrado Localidades";
					console.log(this.message);
				}
			},
			error => {
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

	selected(id:any) {

		console.log(id);
		if (id!=null){
		    this.idConfiguration = id.idConfiguration;
			this.localidad = id.name;
			//this.getSections(this.idConfiguration);
		}else{
			//this.cities=[];
		}
  	}

  	addSectionTable(nameSection: string){
  		console.log(nameSection);
  		this.sectionsConf.push({"idSection":0,"localidad":this.localidad, "sectionName":nameSection, "idConfiguration":this.idConfiguration});
		console.log(this.sectionsConf);
		//var newJsonFile = _.uniqBy(this.sectionsConf, 'name');
		//this.sectionsConf = newJsonFile;
  	}

  	onDeleteSection(id:any){
		//console.log(id);
		var indice = this.sectionsConf.indexOf(id);
		//console.log(indice);
		this.sectionsConf.splice(indice,1);
		//this.totalAforo();
	}

	getSections(){
		this._sectionService.getSectionsEvent(this.idEvent).subscribe(
			response => {
				if(response.code == 200){
					this.sectionsConf = response.data;
					console.log(this.sectionsConf);
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

	deleteSection(section:any){
		this._sectionService.deleteSection(section.idSection).subscribe(
			response => {
				if(response.code == 200){
					
					console.log(response.message);
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
