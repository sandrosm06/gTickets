import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public isLogin:boolean;
  public username:string;
	public emailUser:string;
  public uid:string;
  public events=[];
  
  constructor(
    private _eventService: EventService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.getUid();
  }
  getUid(){
		
		this._authService.getAuth().subscribe( auth => {
      if(auth){
				////console.log("entra");
        ////console.log(auth.uid);
				this.uid = auth.uid;
				this.isLogin = true;
				this.emailUser = auth.email;
				this.getEvents();
				
      }else{
				this.isLogin = false;
				
      }
		});
		
  }
  viewDetail(idEvent:any){
    //console.log(idEvent);
    this._router.navigate(["/event-detail/"+idEvent]);
  }

  viewReport(idEvent:any){
    //console.log(idEvent);
    this._router.navigate(["/report/"+idEvent]);
  }
  getEvents(){
    this._eventService.getEvent(this.uid).subscribe(
			response => {
        ////console.log(response);
				if(response.code == 200){
					this.events = response.data;
					////console.log(this.events);
					////console.log(response.data);
				}else{
					////console.log(response );
				}
			},
			error => {
				//console.log(<any>error);
			}
		);
  }

}
