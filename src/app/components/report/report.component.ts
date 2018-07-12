import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { ExcelService } from '../../services/excel.service';
import { GenerateService } from '../../services/generate.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  public event: { 
		idEvent: number, 
		nameEvent: string, 
		date: string, 
		address: string, 
		active: number,
		phone: string,
		seatsVenue: string,
		venue: string,
		uid: string,
		seats: string,
    idVenue: number}[]=[];
  
    public totalPerSection: { 
      idEvent: number, 
      nameEvent: string, 
      date: string, 
      address: string, 
      active: number,
      phone: string,
      seatsVenue: string,
      venue: string,
      uid: string,
      seats: string,
      idVenue: number,
      totalPerSection:number }[]=[];
  
    public idEvent:number;

  public sections:{
    idConfiguration: number,
    localidad: string,
    idSection: number,
    sectionName: string }[]=[];  
    
  public isLogin:boolean;
  public username:string;
  public emailUser:string;
  public uid:string;
  public totalRead:number=0;
  
  constructor(
    private _authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _eventService: EventService,
    private _excelService: ExcelService,
    private _generateService: GenerateService
  ) { }

  ngOnInit() {
    this.checkUser();
    this.iniciar();
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
  
  iniciar(){
    this.getIdEvent();
    this.getVenue();
    this.getTotalTicketsRead();
    //this.getSectionsEvent();
    //this.getCountPerSection();
    this.getCountPerSection();
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
        ////console.log(response);
				if(response.code == 200){
					this.event = response.data;
					//console.log(this.event);
					//this.status = this.event[0].active;
					
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

  getTotalTicketsRead(){
    this._eventService.getCountTotalTickets(this.idEvent).subscribe(
			response => {
        ////console.log(response);
				if(response.code == 200){
					this.totalRead = response.data;
					//console.log(this.totalRead);
					//this.status = this.event[0].active;
					
					////console.log(response.data);
				}else{
					////console.log(response );
				}
			},
			error => {
        //console.log(<any>error);
        this.totalRead=0;
			});
			////console.log(this.event.length);
  }

  

  getCountPerSection(){
   
      this._eventService.getCountPerSection(this.idEvent).subscribe(
        response => {
          ////console.log(response);
          if(response.code == 200){
            this.totalPerSection = response.data;
            //console.log(response.data);
          }else{
            ////console.log(response );
          }
        },
        error => {
          //console.log(<any>error);
          this.totalRead=0;
        });
        ////console.log(this.event.length);
    }
  
    generarArchivo(idEvent:any){
      var tickets=[];
      this._generateService.getAllTicketsRead(idEvent).subscribe(
        response=>{
          if (response.code==200){
            //console.log(response.data);
            this._excelService.exportAsExcelFile(response.data,"TicketsLeidos");
            tickets = response.data;
          } else {
            //console.log(response);
          }
  
        },
        error=>{
          //console.log(<any>error);
        });
    }
  
}
