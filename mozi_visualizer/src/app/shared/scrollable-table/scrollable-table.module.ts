/**
 * Created by tsadik on 2/25/17.
 */
import { NgModule } from '@angular/core';

import { ScrollDirective } from './directives/scroll.directive';
import { ScrollableTableComponent } from './ui/scrollable-table.component';
import {ScrollableTableService} from "./services/scrollable-table.service";
import {CommonModule} from "@angular/common";
import {MaterialModule} from "@angular/material";

@NgModule({
  imports:[CommonModule,MaterialModule.forRoot(),],
  declarations: [
    ScrollDirective,
    ScrollableTableComponent
  ],
  providers:[ScrollableTableService],
  exports: [
    ScrollableTableComponent
  ]
})
export class ScrollableTableModule{}
