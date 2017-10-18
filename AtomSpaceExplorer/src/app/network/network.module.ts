import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatAutocompleteModule, MatInputModule,
  MatFormFieldModule } from '@angular/material';
import { NetworkComponent } from './network/network.component';
import { NetworkService } from './network/network.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [ NetworkComponent ],
  providers: [ NetworkService ]
})

export class NetworkModule { }
