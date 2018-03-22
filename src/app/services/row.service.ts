import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class RowService{
	public url: string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getRows(id:number){
		return this._http.get(this.url+'get-rows/'+id).map(res => res.json());
	}
	deleteRow(idRow:number){
		return this._http.get(this.url+'delete-row/'+idRow).map(res => res.json());
	}

	saveRows(rows){
		////console.log(contactoProveedor);
		let json = JSON.stringify(rows);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'save_rows', params, {headers: headers})
						 .map(res => res.json());
	}

	deleteTickets(idRow){
		return this._http.get(this.url+'delete-tickets/'+idRow).map(res => res.json());
	}
}