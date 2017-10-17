/**
 * Created by tsadik on 2/25/17.
 */
import { NgModule } from '@angular/core';

import { ScrollDirective } from './directives/scroll.directive';
import { ScrollableTableComponent } from './ui/scrollable-table.component';
import { ScrollableTableService } from './services/scrollable-table.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatAutocompleteModule, MatInputModule,
  MatFormFieldModule } from '@angular/material';

@NgModule({
  imports: [ CommonModule, ],
  declarations: [
    ScrollDirective,
    ScrollableTableComponent
  ],
  providers: [ ScrollableTableService ],
  exports: [
    ScrollableTableComponent
  ]
})

export class ScrollableTableModule { }
