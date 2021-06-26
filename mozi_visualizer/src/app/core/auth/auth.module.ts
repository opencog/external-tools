/**
 * Created by mehari on 11/20/16.
 */
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { MaterialModule } from '@angular/material';

import {LoginComponent} from "./ui/login.component";
import {AuthService} from "./services/auth.service";
import {RegisterComponent} from "./ui/register.component";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        MaterialModule.forRoot()

    ],
    providers: [AuthService],
    exports :[LoginComponent]
})
export class AuthModule { }
