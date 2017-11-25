/**
 * Created by kal on 8/1/17.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';

@Injectable()
export class AtomsService {

  // Empty AtomSpace (Sample data is now loaded from external json file in assets directory)
  private atomsEmpty: any = {
    'result': {
      'atoms': []
    }
  };

  private defaultState = this.atomsEmpty;

  private editItemSource: BehaviorSubject<any> = new BehaviorSubject(this.defaultState);

  public editItem = this.editItemSource.asObservable().distinctUntilChanged();

  changeItem(state) {
    // console.log('AtomsService: Item Changed', state);
    this.editItemSource.next(state);
  }
}
