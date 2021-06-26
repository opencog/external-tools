import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { NetworkComponent } from './network/network.component';
import {NetworkService} from "./network/network.service";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [NetworkComponent],
  providers: [NetworkService]
})
export class NetworkModule { }
