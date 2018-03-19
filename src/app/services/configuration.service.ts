import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class ConfigurationService{
	public url: string;

	constructor(
		public _http: Http
	){
		this.url = GLOBAL.url;
	}

	getConfigurations(id:number){
		return this._http.get(this.url+'get-configurations/'+id).map(res => res.json());
	}

	deleteConfiguration(idConfiguration:number){
		return this._http.get(this.url+'delete-configuration/'+idConfiguration).map(res => res.json());
	}

	saveConfiguration(configuration: any){
		//console.log(contactoProveedor);
		let json = JSON.stringify(configuration);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'save_configuration', params, {headers: headers})
						 .map(res => res.json());
	}

	updateConfiguration(configuration:any){
		let json = JSON.stringify(configuration);
		let params = 'json='+json;
		let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'update-configuration', params, {headers: headers})
						 .map(res => res.json());
	}
}
