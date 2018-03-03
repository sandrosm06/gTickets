import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VenuesService } from '../../services/venues.service';
import { Venue } from '../../models/venue';


@Component({
  selector: 'app-add-venue',
  templateUrl: './add-venue.component.html',
  styleUrls: ['./add-venue.component.scss']
})
export class AddVenueComponent implements OnInit {
  public title: string;
	public venue: Venue;
	public venues=[];
	public message:string;
	public isLogin:boolean;
  public username:string;
	public emailUser:string;
	public uid:string;
  
  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _venueService: VenuesService,
		private _authService: AuthService
  ) { 
    this.venue = new Venue(0,'','','','', '');
  }

  ngOnInit() {
		this._authService.getAuth().subscribe( auth => {
      if(auth){
        console.log(auth.uid);
        this.isLogin = true;
				this.emailUser = auth.email;
				this.venue.uid = auth.uid;
      }else{
        this.isLogin = false;
      }
		});
		
    this.getVenues();
  }

  onSubmit(){
		console.log("Submit");
		this.saveVenue();
		//this._router.navigate(['/add-event');
	}
  saveVenue(){
		console.log(this.venue);
		this._venueService.saveVenue(this.venue).subscribe(
			response=>{
				if (response.code==200){
					this._router.navigate(['/add-event']);
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

	getVenues(){
		this._venueService.getVenues(this.venue.uid).subscribe(
			response => {
				if(response.code == 200){
					this.venues = response.data;
					console.log(this.venues);
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
	onDeleteRow(idVenue:number){
		console.log(idVenue);
	}
	addEvent(idVenue:number){
		console.log(idVenue);
	}
}
