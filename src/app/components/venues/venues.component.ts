import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VenuesService } from '../../services/venues.service';

@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {

  public venues=[];
	public message:string;

  constructor(
    private _route: ActivatedRoute,
		private _router: Router,
		private _venueService: VenuesService
  ) { }

  ngOnInit() {
    //console.log('Se ha cargado el componente home.component.ts');
		this.getVenues();
  }
  getVenues(){
		this._venueService.getVenues().subscribe(
			response => {
				if(response.code == 200){
					this.venues = response.data;
					console.log(this.venues);
				}else{
					this.message="no se ha encontrado Locales";
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
		this._router.navigate(['/add-event/'+idVenue]);
	}
	addNewVenue(){
		this._router.navigate(['/add-venue/']);
	}

}
