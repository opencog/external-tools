/**
 * Created by kal on 11/16/16.
 */

import {Component, OnInit, Input, SimpleChanges, OnChanges} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {ScrollableTableService} from "../services/scrollable-table.service";

@Component({
    selector: 'scrollable-table',
    templateUrl: '../templates/scrollable-table.component.html',
    styleUrls: ['../styles/scrollable-table.component.css']
})

export class ScrollableTableComponent implements OnInit,OnChanges {
    @Input() id;
    @Input() size;
    @Input() from;

    private dataset =[];
    private col_headers;
    private isProcessing:boolean = false;

    public dataCount = 1;
    public isDataLoaded = false;

    constructor(private route: ActivatedRoute, private router: Router, private scrollableTableService: ScrollableTableService) {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes : SimpleChanges){
      if(changes['id'].currentValue != null){
        this.downloadDataset(this.from,this.size);
      }
    }

    downloadDataset(from, size){
      this.scrollableTableService
        .getProjectDataset(this.id,from,size)
        .subscribe(
            res => this.extractData(res),
            err => this.handleError(err)
        );

    }

    private extractData(res) {
        this.isDataLoaded = true;
      let csvData = res.response.columns;
      this.col_headers = res.response.labels.split(',');

      let lines = [];
      for ( let i = 1; i < csvData.length; i++) {
        lines.push(csvData[i].split(','));
      }
      this.dataset = lines;

      this.isProcessing = false;
    }


    private handleError (error: any) {
          let errMsg = (error.message) ? error.message :
              error.status ? `${error.status} - ${error.statusText}` : 'Server error';
          console.error(errMsg);
          return errMsg;
      }

    private handleScroll(event){
      let scrollTop = event.srcElement.scrollTop;
      if((scrollTop > 1500 && scrollTop < 1600)){
          if(this.isProcessing == false){
              this.dataCount += 50;
              this.downloadDataset(this.dataCount,this.size);
              this.isProcessing = true;
              event.srcElement.scrollTop = 50;
          }
      }
      // else if((scrollTop > 0 && scrollTop < 150)){
      //   if(this.dataCount > 1){
      //     this.dataCount -= 50;
      //     this.downloadDataset(this.dataCount,this.size);
      //     event.srcElement.scrollTop = 50;
      //     console.log(scrollTop);
      //   }
      //
      // }

    }


}
