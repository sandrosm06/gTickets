import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class EventService{
	public url: string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getEvent(uid:string){
		//console.log(uid);
		return this._http.get(this.url+'get-events/'+uid).map(res => res.json());
	}

	getLastEvent(){
		return this._http.get(this.url+'get-last-event').map(res => res.json());
	}

	saveEvent(event: any){
		//console.log(contactoProveedor);
		let json = JSON.stringify(event);
		let params = 'json='+json;
    let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
    
		return this._http.post(this.url+'save_event', params, {headers: headers})
						 .map(res => res.json());
	}
}