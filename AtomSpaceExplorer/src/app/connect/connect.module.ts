import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UrlConnectComponent } from './url-connect/url-connect.component';
import { UrlConnectService } from './url-connect/url-connect.service';
import { SharedModule } from '../shared/shared.module';

import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [UrlConnectComponent],
  providers: [UrlConnectService]
})

export class ConnectModule { }
