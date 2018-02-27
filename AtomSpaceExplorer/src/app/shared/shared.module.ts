/**
 * Created by tsadik on 2/25/17.
 */
import { NgModule } from '@angular/core';
import { ScrollableTableModule } from './scrollable-table/scrollable-table.module';
import { InitializeDropdown } from './directives/intitialise-dropdown.directive';
import { OrderByPipe } from './pipes/orderby.pipe';
import { CardTransition } from './directives/card-transition.directive';
import { SearchPipe } from './pipes/search.pipe';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { InitializeModal } from './confirmation-dialog/initialise-modal.directive';
import { InitializeToggle } from './directives/intialise-toogle.directive';
import { TranslatePipe } from '../core/translate/translate.pipe';
import { TranslateModule } from '../core/translate/translate.module';
import { InitializeTooltip } from './directives/initialise-tooltip.directive';
import { TruncatePipe } from './pipes/truncate.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { OpencogAPIService } from './services/opencog_API.service';
import { AtomService } from 'ng2-atomspace-visualizer';
import { EqualValidator } from './directives/equal-validator.directive';

@NgModule({
  imports: [ TranslateModule, BrowserModule, CommonModule ],
  declarations: [
    InitializeDropdown,
    CardTransition,
    OrderByPipe,
    SearchPipe,
    TruncatePipe,
    ConfirmationDialogComponent,
    InitializeToggle,
    InitializeTooltip,
    InitializeModal,
    EqualValidator
  ],
  providers: [ OpencogAPIService, AtomService ],
  exports: [ InitializeDropdown, InitializeToggle, InitializeTooltip, OrderByPipe, SearchPipe, TruncatePipe, TranslatePipe,
    CardTransition, ConfirmationDialogComponent ]
})
export class SharedModule { }
