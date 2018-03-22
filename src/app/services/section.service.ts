import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Section } from '../models/section';
import { GLOBAL } from './global';


@Injectable()
export class SectionService{
	public url: string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getSections(id:number){
		return this._http.get(this.url+'get-sections/'+id).map(res => res.json());
	}
	getSectionsEvent(id:number){
		return this._http.get(this.url+'get-sections-event/'+id).map(res => res.json());
	}

	deleteSection(idSection:number){
		return this._http.get(this.url+'delete-section/'+idSection).map(res => res.json());
	}
	saveSection(section){
		////console.log(contactoProveedor);
		let json = JSON.stringify(section);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'save_section', params, {headers: headers})
						 .map(res => res.json());
	}
}