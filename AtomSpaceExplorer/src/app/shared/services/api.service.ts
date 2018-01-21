import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { configs } from '../../app.config';

@Injectable()
export class APIService {
    private ROOT_PATH = configs.local_api_url;
    TOKEN_KEY: string = 'access_token';
    headers: Headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Headers' : 'Accept-Ranges',
        'authorization': ''
    });

    public static toastMessageEvent =  new EventEmitter();

    constructor(private _http: Http) {
    }

    public get(path: string): Observable<any> {
        this.setHeaders(window.localStorage.getItem(this.TOKEN_KEY));
        return this._http.get(`${this.ROOT_PATH}${path}`,{headers: this.headers})
            .map((res: Response) => res.json())
            .catch(this.handleError);

    }

    public post(path: string, body): Observable<any> {
        this.setHeaders(window.localStorage.getItem(this.TOKEN_KEY));
        return this._http.post(`${this.ROOT_PATH}${path}`, body, {headers: this.headers})
                        .map((res: Response) => res.json())
                        .catch(this.handleError);


    }

    public put(path: string, body): Observable<any> {
        this.setHeaders(window.localStorage.getItem(this.TOKEN_KEY));
        return this._http.put(`${this.ROOT_PATH}${path}`, body, {headers: this.headers})
                        .map((res: Response) => res.json())
                        .catch(this.handleError);

    }

    public delete(path: string): Observable<any> {
        this.setHeaders(window.localStorage.getItem(this.TOKEN_KEY));
        return this._http.delete(`${this.ROOT_PATH}${path}`, {headers: this.headers})
                            .map((res: Response) => res.json())
                            .catch(this.handleError);

    }

    public patch(path: string, body: any): Observable<any> {
        this.setHeaders(window.localStorage.getItem(this.TOKEN_KEY));
        return this._http.patch(`${this.ROOT_PATH}${path}`, body, {headers: this.headers})
                        .map((res: Response) => res.json())
                        .catch(this.handleError);
    }

    private setHeaders(token) {
        this.headers.set('authorization', token);
    }

    private handleError(response) {

        let err = {status:0,message:''};
        err.status = response.status ? response.status : 0;
        err.message = response.statusText ? response.statusText : 'Server Down';

        if (response.ok){
          return response;
        }
        else if (response.status == 0) {
            APIService.toastMessageEvent.emit({msg:'The Server is down!',title:'Network Error'})
        }
        else if(response.status === 422){
            // APIService.toastMessageEvent.emit({msg:"Uprocesseable Entity!", title:"Validation Error"});
            // let the component handle the error
        } else if (response.status == 400) {
            APIService.toastMessageEvent.emit({msg:'Something went wrong', title:'Bad request'});
        } else if (response.status == 401) {
            APIService.toastMessageEvent.emit({msg:'You\'re are not authorized to do this action',title: 'Unauthorized'});
        } else if (response.status == 404) {
            APIService.toastMessageEvent.emit({msg:'The Item you are looking for is not Found', title:'Not Found'});
        } else if (response.status === 500) {
            APIService.toastMessageEvent.emit({msg: 'Something wrong happened', title: 'Unknown Error'});
        }
        return Observable.throw(err);


    }
}
