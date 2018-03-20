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

	getEventDetail(id:number){
		//console.log(uid);
		return this._http.get(this.url+'get-event-detail/'+id).map(res => res.json());
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
	isCreatedConfigurations(idEvent:any){
		return this._http.get(this.url+'isConfiugrationsCreated/'+idEvent).map(res => res.json());
	}
	isSectionsCreated(idEvent:any){
		return this._http.get(this.url+'isSectionsCreated/'+idEvent).map(res => res.json());
	}

	deleteTickets(idRow:any){
		return this._http.get(this.url+'delete-tickets/'+idRow).map(res => res.json());
	}

	deleteRow(idRow:any){
		return this._http.get(this.url+'delete-row/'+idRow).map(res => res.json());
	}

	onUpdateDetail(row:any){
		console.log(row);
		let json = JSON.stringify(row);
		let params = 'json='+json;
    	let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'update-rows', params, {headers: headers})
						 .map(res => res.json());
		
	}

	onUpdateEventDetail(event:any){
		console.log(event);
		let json = JSON.stringify(event);
		let params = 'json='+json;
    	let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'update-event-details', params, {headers: headers})
						 .map(res => res.json());
		
	}

	updateConfigurations(config:any){
		//console.log(venue);
		let json = JSON.stringify(config);
		let params = 'json='+json;
    	let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'update-configuration', params, {headers: headers})
						 .map(res => res.json());
		
	}

	updateSections(sect:any){
		//console.log(venue);
		let json = JSON.stringify(sect);
		let params = 'json='+json;
    	let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'update-sections', params, {headers: headers})
						 .map(res => res.json());
		
	}

	getConfigurations(idEvent:any){
		return this._http.get(this.url+'get-configurations/'+idEvent).map(res => res.json());
	}
	getSections(idSection:any){
		return this._http.get(this.url+'get-sections/'+idSection).map(res => res.json());
	}
	getSectionsEvent(idEvent:any){
		return this._http.get(this.url+'get-sections-event/'+idEvent).map(res => res.json());
	}

	getSumRows(idEvent:any){
		return this._http.get(this.url+'get-sum-rows/'+idEvent).map(res => res.json());
	}

	getSumConfigurations(idEvent:any){
		return this._http.get(this.url+'get-sum-configurations/'+idEvent).map(res => res.json());
	}
	getSumSeats(idEvent:any){
		return this._http.get(this.url+'get-sum-seats/'+idEvent).map(res => res.json());
	}
	
	
}