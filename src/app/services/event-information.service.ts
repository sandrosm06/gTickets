import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
//import { Event } from '../models/event';
import { GLOBAL } from './global';


@Injectable()
export class EventInformationService{
	public url: string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getAforo(idEvent:number){
		return this._http.get(this.url+'get-aforo/'+idEvent).map(res => res.json());
	}
	getEventDetail(id:number){
		////console.log(uid);
		return this._http.get(this.url+'get-event-detail/'+id).map(res => res.json());
	}

	
}
