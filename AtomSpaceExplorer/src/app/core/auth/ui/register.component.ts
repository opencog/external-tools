import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { CustomValidators } from "../../../shared/validators/validators";
import { UserAccount } from "../models/user-account.model.interface";

@Component({
  selector: 'app-register',
  templateUrl: '../templates/register.component.html',
  styleUrls: ['../../../../assets/semantic/semantic.min.css']
})
export class RegisterComponent implements OnInit {
  public userForm: FormGroup;
  public user: any = {};
  constructor(private fb: FormBuilder, private _router: Router, private _authService: AuthService) {
    this.userForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', CustomValidators.emailValidator],
    });
  }

  ngOnInit() {
    // initialize model here
    this.user = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  public register() {
    this._authService.register(this.user)
      .subscribe(
      res => {
        this._authService.login(this.user).subscribe(
          res => {
            this._router.navigate(['', 'data-sets'])
          }
        );
      }
      );
  }
}
