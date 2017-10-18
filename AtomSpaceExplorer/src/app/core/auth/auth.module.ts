/**
 * Created by mehari on 11/20/16.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatAutocompleteModule, MatInputModule,
  MatFormFieldModule } from '@angular/material';
import 'hammerjs';

import { LoginComponent } from './ui/login.component';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './ui/register.component';

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

    ],
    providers: [ AuthService ],
    exports: [ LoginComponent ]
})

export class AuthModule { }
