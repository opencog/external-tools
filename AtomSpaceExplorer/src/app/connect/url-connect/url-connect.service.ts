import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { timeout } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import { configs } from '../../app.config';

@Injectable()
export class UrlConnectService {
  headers: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Accept-Ranges',
    'authorization': ''
  });

  public static toastMessageEvent = new EventEmitter();

  constructor(private _http: Http) {
  }

  public get(path: string): Observable<any> {
    const api_timeout: number = +configs.opencog_url_timeout;
    const api_urlroot: string = configs.atomspace_api;

    // Retrieving sample *.json files from ./assets?
    const url = path.endsWith('.json') ? path : `${path}${api_urlroot}/atoms`;

    return this._http.get(url, { headers: this.headers })
      .pipe(timeout(api_timeout))
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  private setHeaders(token) {
    this.headers.set('authorization', token);
  }

  private handleError(response) {
    const err = { status: 0, message: '' };
    const errtitle = 'Error';
    err.status = response.status ? response.status : 0;
    err.message = response.statusText ? response.statusText : 'Unknown Error';

    console.log(response);

    if (response.ok) {
      return response;
    } else if (response instanceof SyntaxError) {
      err.message = 'Syntax Error';
      UrlConnectService.toastMessageEvent.emit({ msg: err.message, title: errtitle });
    // } else if (response instanceof TimeoutError ) {
    } else if (response.name && response.name === 'TimeoutError') {
      err.message = 'Timeout Error';
      UrlConnectService.toastMessageEvent.emit({ msg: err.message, title: errtitle });
    } else if (response.status === 0) {
      err.message = 'The Server is down or unreachable';
      UrlConnectService.toastMessageEvent.emit({ msg: err.message, title: errtitle });
    } else if (response.status === 422) {
      // Typically means request body is well-formed (i.e. syntactically correct), but semantically erroneous
      // UrlConnectService.toastMessageEvent.emit({msg:"Uprocesseable Entity!", title:"Validation Error"});
      // let the component handle the error
    } else if (response.status === 400) {
      err.message = '400 Bad Request';
      UrlConnectService.toastMessageEvent.emit({ msg: err.message, title: errtitle });
    } else if (response.status === 401) {
      err.message = '401 Unauthorized';
      UrlConnectService.toastMessageEvent.emit({ msg: err.message, title: errtitle });
    } else if (response.status === 404) {
      err.message = '404 Not Found';
      UrlConnectService.toastMessageEvent.emit({ msg: err.message, title: errtitle });
    } else if (response.status === 500) {
      err.message = '500 Internal Server Error';
      UrlConnectService.toastMessageEvent.emit({ msg: err.message, title: errtitle });
    }
    return Observable.throw(err);
  }
}
