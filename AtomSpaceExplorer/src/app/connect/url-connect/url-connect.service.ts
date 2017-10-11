import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { configs } from "../../app.config";
 
@Injectable()
export class UrlConnectService {
    headers: Headers = new Headers({
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Headers" : "Accept-Ranges",
        "authorization": ""
    });

    public static toastMessageEvent =  new EventEmitter();

    constructor(private _http: Http) {
    }

    public get(path: string): Observable<any> {
        return this._http.get(path,{headers: this.headers})
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

        if (response.ok)
        {
          return response;
        }
        else if (response.status == 0) {
            UrlConnectService.toastMessageEvent.emit({msg:"The Server is down!",title:"Server Error"})
        }
        else if(response.status === 422){
            // UrlConnectService.toastMessageEvent.emit({msg:"Uprocesseable Entity!", title:"Validation Error"});
            //let the component handle the error
        }
        else if (response.status == 400) {
            UrlConnectService.toastMessageEvent.emit({msg:"Something went wrong", title:"Bad request"});
        }
        else if (response.status == 401) {
            UrlConnectService.toastMessageEvent.emit({msg:"You're are not authorized to do this action",title: "Unauthorized"});
        }
        else if (response.status == 404) {
            UrlConnectService.toastMessageEvent.emit({msg:"The Item you are looking for is not Found", title:"Not Found"});
        }
        else if (response.status == 500) {
            UrlConnectService.toastMessageEvent.emit({msg:"Something wrong happened", title:"Unknown Error"});
        }
        return Observable.throw(err);


    }
}
