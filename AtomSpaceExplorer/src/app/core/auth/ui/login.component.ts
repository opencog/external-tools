import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: '../templates/login.component.html',
  styleUrls: ['../../../../assets/semantic/semantic.min.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void { }

  public isCorrect = true;
  public userForm: FormGroup;
  public user: any = {};
  constructor(private fb: FormBuilder, private _router: Router, private _authService: AuthService) {
    this.userForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() { }

  private navigateToRegister() {
    this._router.navigate(['/register']);
  }

  public authenticate() {
    this._authService
      .login(this.user)
      .subscribe(
      res => {
        this._router.navigate(['/data-sets']);
      },
      err => {
        if (err.status = 401) {
          this.isCorrect = false;
        }
      });
  }
}
