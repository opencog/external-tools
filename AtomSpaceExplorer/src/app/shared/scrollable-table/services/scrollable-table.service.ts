/**
 * Created by kal on 11/7/16.
 */

import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { configs } from '../../../app.config';

@Injectable()
export class ScrollableTableService {

  private url = configs.local_api_url + 'DataSets';
  private datasetPath = 'records';

  constructor (private http: Http) {
  }

  private getJson(res: Response) {
    return res.json();
  }

  getProjectDataset(id: string, from: number, size: number) {
    return this.http.get(`${this.url}/${id}/${this.datasetPath}?from=${from}&size=${size}`)
      .map(this.getJson);
  }
}
