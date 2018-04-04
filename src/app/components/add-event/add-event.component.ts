import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';
import { VenuesService } from '../../services/venues.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
	//public event: Event;
	public event: { idEvent: number, 
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
	public idVenue: number;
	public venue=[];
	

  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _eventService: EventService,
		private _venuesService:VenuesService
  ) {
    //this.event = new Event(0,'','','',0,0);
   }

  ngOnInit() {
    this.getIdVenue();
		//this.event.Venue_idVenue=this.idVenue;
		this.event[0].idVenue=this.idVenue;
		this.getVenue();
  }

  onSubmit(){
		//console.log("Submit");
		this.saveEvent();
		//this._router.navigate(['/configurations');
	}

	getVenue(){
    this._venuesService.getVenue(this.idVenue).subscribe(
			response => {
        ////console.log(response);
				if(response.code == 200){
					this.venue = response.data;
					//console.log(this.venue);
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

	saveEvent(){
		//console.log(this.event);
		this._eventService.saveEvent(this.event).subscribe(
			response=>{
				if (response.code==200){
					this._router.navigate(['/add-configurations/'+response.id.ID]);
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

	getIdVenue(){
		this._route.params.forEach((params: Params) => {
			let id = params['idVenue'];
			this.idVenue = id;
		});
	}
}
