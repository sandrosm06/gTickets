import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {
  public event: Event;
	public idVenue: number;

  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _eventService: EventService
  ) {
    this.event = new Event(0,'','','',0);
   }

  ngOnInit() {
    this.getIdVenue();
		this.event.Venue_idVenue=this.idVenue;
  }

  onSubmit(){
		console.log("Submit");
		this.saveEvent();
		//this._router.navigate(['/configurations');
	}
	saveEvent(){
		console.log(this.event);
		this._eventService.saveEvent(this.event).subscribe(
			response=>{
				if (response.code==200){
					this._router.navigate(['/add-configurations/'+response.id.ID]);
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

	getIdVenue(){
		this._route.params.forEach((params: Params) => {
			let id = params['idVenue'];
			this.idVenue = id;
		});
	}
}
