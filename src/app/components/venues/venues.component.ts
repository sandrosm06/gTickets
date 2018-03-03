import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VenuesService } from '../../services/venues.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-venues',
  templateUrl: './venues.component.html',
  styleUrls: ['./venues.component.scss']
})
export class VenuesComponent implements OnInit {

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
  ) { }

  ngOnInit() {
		//console.log('Se ha cargado el componente home.component.ts');
		this.getUid();
		//this.getVenues();
	}
	getUid(){
		
		this._authService.getAuth().subscribe( auth => {
      if(auth){
				//console.log("entra");
        //console.log(auth.uid);
				this.uid = auth.uid;
				this.isLogin = true;
				this.emailUser = auth.email;
				this.getVenues();
				
      }else{
				this.isLogin = false;
				
      }
		});
		
	}
  getVenues(){
		console.log(this.uid);
		this._venueService.getVenues(this.uid).subscribe(
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
