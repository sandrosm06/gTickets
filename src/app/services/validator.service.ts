import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { Http, Response, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class ValidatorService {

  public url: string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
  }
  
  validar(ticketNumber: any){
    return this._http.get(this.url+'validar2/'+ticketNumber).map(res => res.json());
  }
}
