import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class GenerateService {

  public url: string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	//getConfigurationSections(id:number){
		//return this._http.get(this.url+'get-section-configurations/'+id).map(res => res.json());
	//}
	getRows(idEvent: number){
		//console.log(this.url+'get-rows/'+idEvent);
		return this._http.get(this.url+'get-rows/'+idEvent).map(res => res.json());
	}
	generateTicekts(row){
		let json = JSON.stringify(row);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'generate-tickets', params, {headers: headers})
						 .map(res => res.json());
	}
	

	isTicketsGenerated(row){
		////console.log(row);
		return this._http.get(this.url+'isTicketsGenerated/'+row).map(res => res.json());
	}

	getRowsGenerated(){
		return this._http.get(this.url+'get-rows-generated').map(res => res.json());
	}

	getRowsGeneratedEvent(idEvent:number){
		return this._http.get(this.url+'get-rows-generated-event/'+idEvent).map(res => res.json());
	}
	
	getTickets(idRow: number){
		return this._http.get(this.url+'get-tickets/'+idRow).map(res => res.json());
	}

	
	/*saveRows(rows[]){
		////console.log(contactoProveedor);
		let json = JSON.stringify(rows);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'save_rows', params, {headers: headers})
						 .map(res => res.json());
	}*/

}
