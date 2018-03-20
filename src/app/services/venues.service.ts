import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
//import { Venue } from '../models/venue';
import { GLOBAL } from './global';

@Injectable()
export class VenuesService {
  public url: string;

  constructor(
    private _http: Http
  ) { 
    this.url = GLOBAL.url;
  }


  getVenues(uid:string){
		return this._http.get(this.url+'get-venues/'+uid).map(res => res.json());
	}

	getVenue(id:number){
		return this._http.get(this.url+'get-venue/'+id).map(res => res.json());
	}

	saveVenue(venue: any){
		//console.log(contactoProveedor);
		let json = JSON.stringify(venue);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'save_venue', params, {headers: headers})
		.map(res => res.json());
	}
}
