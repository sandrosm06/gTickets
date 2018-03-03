import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SectionService } from '../../services/section.service';
import { ConfigurationService } from '../../services/configuration.service';
import { Configuration } from '../../models/configurations';
import { Section } from '../../models/section';

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
	public name:string;
	public localidad:string;
  public message:string;
  
  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _sectionService: SectionService,
		private _configurationService: ConfigurationService
  ) {
    this.sections = new Section(0,'',0);
   }

  ngOnInit() {
    this.getIdEvent();
		this.getConfigurations(this.idEvent);
  }
  onSubmit(){
		console.log("Submit");
		this.saveSection();
		//this._router.navigate(['/configurations');
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
					this.message="no se ha encontrado configuraciones";
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
		}else{
			//this.cities=[];
		}
  	}

  	addSectionTable(nameSection: string){
  		console.log(name);
  		this.sectionsConf.push({"localidad":this.localidad, "name":nameSection, "idConfiguration":this.idConfiguration});
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

}
