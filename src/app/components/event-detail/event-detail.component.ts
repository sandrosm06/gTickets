import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../services/event.service';
import { RowService } from '../../services/row.service';
import { GenerateService } from '../../services/generate.service';
import { ExcelService } from '../../services/excel.service';


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  public idEvent:number;
  public event=[];
  public rows=[];
  public idGenerated=[];

  constructor(
    private _eventService: EventService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _rowService: RowService,
    private _generateService: GenerateService,
    private _excelService: ExcelService
  ) { }

  ngOnInit() {
    this.getIdEvent();
    this.getVenue();
    this.getRows();
    this.getRowsGenerated();

  }

  getIdEvent(){
		this._route.params.forEach((params: Params) => {
			let id = params['idEvent'];
			this.idEvent = parseInt(id);
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
}
