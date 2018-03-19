import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../services/event.service';
import { RowService } from '../../services/row.service';
import { GenerateService } from '../../services/generate.service';
import { ExcelService } from '../../services/excel.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { SectionService } from '../../services/section.service';
import { Configuration } from '../../models/configurations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalChangeGenerateTicketsComponent } from '../modal-change-generate-tickets/modal-change-generate-tickets.component';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {ChangeDetectorRef} from '@angular/core';




@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  closeResult: string;
  public idEvent:number;
	public event=[];
	public configurations=[];
	public config=[];
	public sections=[];
  public rows=[];
  public idGenerated=[];
  public createdConfigurations:boolean=false;
  public createdSections:boolean=false;
  public editVenue:boolean=false;
  public editDate:boolean=false; 
	public editDetails:boolean=false;

	public editConfigurations:boolean=false;
	public editSections:boolean=false;


	public aforo=[];
	public suma:number=0;
	public sumaAforoRow:number=0;
	public aforoTotal:number=0;
	public aforoLocalidades:number=0;
	public isSeatsOk:boolean=true;
	//public isSeatsGenerated:boolean=false;
	public totalSeats=[];

	public modal:ModalChangeGenerateTicketsComponent;
  

  constructor(
    private _eventService: EventService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _rowService: RowService,
		private _generateService: GenerateService,
		private _sectionService: SectionService,
		private _excelService: ExcelService,
		private _flashMessage: FlashMessagesService,
		private _modalService: NgbModal,
		private _cd: ChangeDetectorRef

  ) {
			//this.configurations = new Configuration(0,'','',0);

	 }

  ngOnInit() {
		this.iniciar();
  }

	private iniciar() {
		this.getIdEvent();
		//this.getSections();
		this.getVenue();
		this.getRows();
		this.getRowsGenerated();
		this.isCreatedConfigurations();
		this.isSectionsCreated();
		this.getConfigurations();
		this.getSectionsEvents();
		this.getSumSeats();
		//this.totalAforo();
		//this.getSumRows();
		//this.getSumConfigurations();
		//this.getSumSeats();
		console.log(this.config);
	}

  getIdEvent(){
		this._route.params.forEach((params: Params) => {
			let id = params['idEvent'];
			this.idEvent = parseInt(id);
		});
  }
  editEventName(edit:boolean){
		this.editVenue=edit;
		console.log(edit);
  }
  
  updateEventDetail(edit:boolean, event:any){
		this.editVenue=edit;
		this._eventService.onUpdateEventDetail(event).subscribe(
		response => {
			//console.log(response);
			if(response.code == 200){
				this._flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 4000});
			}else{
				//console.log(response );
				this._flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 4000});
			}
		},
		error => {
			console.log(<any>error);
		});
  }

  editEventDate(edit:boolean){
		this.editDate = edit;
		console.log(edit);
  }
  
  saveEventDate(edit:boolean, venue:any){
		this.editDate=edit;
		console.log(venue);
  }

  editDetail(edit:boolean, venue:any){
		this.editDetails=edit;
		console.log(edit);
	}
	
  saveEventDetail(edit:boolean, venue:any){
		this.editDetails=edit;
		console.log(venue);
		//if(this.isSeatsOk){
			this._eventService.deleteTickets(venue.idRow).subscribe(
				response => {
					if(response.code == 200){
						this._flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 4000});
						
					}else{
						this._flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 4000});
					}
				},
				error =>{
					console.log(<any>error);
				}
			);
			
			
			this._eventService.onUpdateDetail(venue).subscribe(
				response => {
					//console.log(response);
					if(response.code == 200){
						this._flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 4000});
						venue.isTicketsGenerated=0;
						console.log(venue);
					}else{
						//console.log(response );
						this._flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 4000});
					}
				},
				error => {
					console.log(<any>error);
				});
		/*}else{
			this._flashMessage.show('No se puede actualizar los registros, verifique el Aforo', {cssClass: 'alert-danger', timeout: 4000});
		}*/
		//this.getRows();
		this._cd.detectChanges();

		this.cancelEventDetail(false);
		
		//console.log("sale");
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

  isCreatedConfigurations(){
    this._eventService.isCreatedConfigurations(this.idEvent).subscribe(
			response => {
        //console.log(response);
				if(response.code == 200){
					this.createdConfigurations=true;
					console.log(this.createdConfigurations);
					//console.log(response.data);
				}else{
					this.createdConfigurations=false;
					console.log(this.createdConfigurations);
					//console.log(response );
				}
			},
			error => {
				console.log(<any>error);
			});
  }
  isSectionsCreated(){
    this._eventService.isSectionsCreated(this.idEvent).subscribe(
			response => {
        //console.log(response);
				if(response.code == 200){
					this.createdSections=true;
					console.log(this.createdConfigurations);
					//console.log(response.data);
				}else{
					this.createdConfigurations=false;
					console.log(this.createdSections);
					//console.log(response );
				}
			},
			error => {
				console.log(<any>error);
			});
  }

  getRows(){
    this._rowService.getRows(this.idEvent).subscribe(
			response => {
        //console.log(response);
				if(response.code == 200){
					this.rows = response.data;
					//console.log(this.rows);
					//console.log(response.data);
				}else{
					//console.log(response );
				}
			},
			error => {
				console.log(<any>error);
			});
  }

  generarTickets(row){
		console.log(row);
		this._generateService.generateTicekts(row).subscribe(
			response=>{
				if (response.code==200){
					//this._router.navigate(['/add-sections/'+this.idEvent]);
					//this.isGenerated=true;
					this.idGenerated.push(row.idRow);
					row.isTicketsGenerated=1;
					console.log(this.idGenerated);
					//console.log(response);
					//this.isGenerated(row.idRow);
				} else {
					console.log(response);
				}

			},
			error=>{
				console.log(<any>error);
			});
	}

	generarArchivo(row){
		var tickets=[];
		this._generateService.getTickets(row).subscribe(
			response=>{
				if (response.code==200){
					console.log(response.data);
					this._excelService.exportAsExcelFile(response.data,"tickets-01");
					tickets = response.data;
				} else {
					console.log(response);
				}

			},
			error=>{
				console.log(<any>error);
			});
  }
  

  isGenerated(idRow:number){
    //console.log(idRow);
    //console.log(this.idGenerated);
		var retorna=false;
		for (var i = 0; i < this.idGenerated.length; i++) {

			if (this.idGenerated[i] == idRow) {
				//console.log("retorna true");
				//console.log(this.idGenerated[i]);
				retorna=true;
				
			}
		}
		//console.log(retorna);
		return retorna;

  }
  
  getRowsGenerated(){
		this._generateService.getRowsGeneratedEvent(this.idEvent).subscribe(
			response=>{
				if (response.code==200){
					var data = response.data;

					for(var i=0; i<data.length; i++){
						this.idGenerated.push(data[i].Rows_idRow);
					}
				} else {
					console.log(response.status);
				}

			},
			error=>{
				console.log(<any>error);
			}
		);

	}

	seatsPerRow(row:any){
		console.log(row);
		if(parseInt(row.seatsPerRow) <= parseInt(row.seatsNumber)){
			row.isSeatsOK=true;
			console.log(row.isSeatsOK);
		}else{
			row.isSeatsOK=false;
			console.log(row.isSeatsOK);
		}	
	}

	
	
	totalAforo(){
		console.log("entra a total aforo");
		this.aforoTotal=0;
		this.aforoLocalidades=0;
		this.isSeatsOk=true;
    //console.log(this.rows);
		/*for(var i=0; i<this.rows.length; i++){
			this.aforoTotal = this.aforoTotal + parseInt(this.rows[i].seatsPerRow);
			this.aforoLocalidades = this.aforoLocalidades + parseInt(this.rows[i].seatsNumber);
		}
		
		for(var i=0; i<this.event.length; i++){
			//console.log(this.aforoLocalidades);
			if(this.aforoTotal > this.event[i].seats || this.aforoLocalidades > this.event[i].seats ){
				this._flashMessage.show('Error en Aforo!', {cssClass: 'alert-danger', timeout: 4000});
				this.isSeatsOk=false;
			}else{
				this.isSeatsOk=true;
			}
		}
		console.log(this.aforoTotal);*/
	}
	

	getConfigurations(){
		console.log("configuraciones");
    this._eventService.getConfigurations(this.idEvent).subscribe(
			response => {
        //console.log(response);
				if(response.code == 200){
					this.configurations = response.data;
					this.config = this.configurations;
					console.log(this.configurations);
					//this.getSections();

				}else{
					console.log(response.message );
				}
			},
			error => {
				console.log(<any>error);
			});
			
	}
	
	getSectionsEvents(){
		this._eventService.getSectionsEvent(this.idEvent).subscribe(
			response => {
				if(response.code == 200){
					this.sections = response.data;
					console.log(this.sections);
					//console.log(response.data);
				}else{
					//console.log(response );
				}
			},
			error => {
				console.log(<any>error);
			});
	}

	getSumSeats(){
		this.suma=0;
		//console.log("Entra a sumar " + this.configurations.length);
		for(let i = 0; i < this.configurations.length; i++){
			//console.log(this.configurations[i].seatsNumber);
			//console.log(this.config);
			this.suma=this.suma+parseInt(this.configurations[i].seatsNumber);
		}
		return(this.suma);
	}

	getSumRows(){
		this.sumaAforoRow=0;
		for(let i = 0; i < this.rows.length; i++){
			this.sumaAforoRow = this.sumaAforoRow + parseInt(this.rows[i].seatsPerRow);
		}
		return(this.sumaAforoRow);
	}
	
	getRows2(){
		let config2=[];
		
		this._eventService.getConfigurations(this.idEvent).subscribe(
			response => {
				console.log(this.idEvent);
        //console.log(response);
				if(response.code == 200){
					this.config = response.data;
					console.log(config2);
					//this.getSections();

				}else{
					console.log(response.message );
				}
			},
			error => {
				console.log(<any>error);
			});
			//return (config2);
	}
	getSumConfigurations(){
		this._eventService.getSumConfigurations(this.idEvent).subscribe(
			response => {
				if(response.code == 200){
					this.aforoLocalidades = response.data;
					//console.log(response.data);
				}else{
					//console.log(response );
				}
			},
			error => {
				console.log(<any>error);
			});
	}
	
	editSection(edit:boolean, sec:any){
		this.editSections=edit;
		console.log(edit);
	}

	cancelSection(edit:boolean){
		this.editSections=edit;
		console.log(edit);
	}
	
	editConfiguration(edit:boolean, config:any){
		this.editConfigurations=edit;
		console.log(edit);
	}

	cancelConfiguration(edit:boolean){
		this.editConfigurations=edit;
		console.log(edit);
	}
	cancelEventDetail(edit:boolean){
		this.editDetails=edit;
	}
	updateConfiguration (edit:boolean, config:any){
			this.editConfigurations=edit;
		console.log(config);
		this._eventService.updateConfigurations(config).subscribe(
			response => {
				//console.log(response);
				if(response.code == 200){
					this._flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 4000});
				}else{
					//console.log(response );
					this._flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 4000});
				}
			},
			error => {
				console.log(<any>error);
			});

			this.ngOnInit();
	}
	updateSection (edit:boolean, sect:any){
		this.editSections=edit;
		console.log(sect);
		this._eventService.updateSections(sect).subscribe(
			response => {
				//console.log(response);
				if(response.code == 200){
					this._flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 4000});
				}else{
					//console.log(response );
					this._flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 4000});
				}
			},
			error => {
				console.log(<any>error);
			});

			this.ngOnInit();
	}

	open(content) {
    this._modalService.open(content).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
	}
	
	eliminarRow(row:any){
		console.log(row);

		this._eventService.deleteRow(row.idRow).subscribe(
			response => {
				if(response.code == 200){
					this._flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 4000});
					this.iniciar();
				}else{
					this._flashMessage.show(response.message, {cssClass: 'alert-danger', timeout: 4000});
				}
			},
			error =>{
				console.log(<any>error);
			}
		);
		
		
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