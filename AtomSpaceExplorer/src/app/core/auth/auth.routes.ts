import { Routes } from '@angular/router';
import {LoginComponent} from "./ui";
import {RegisterComponent} from "./ui/register.component";

export const AuthRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];
