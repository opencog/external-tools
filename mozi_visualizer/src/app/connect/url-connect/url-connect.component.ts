import { Component, OnInit, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UrlConnectService } from './url-connect.service';
import { AtomsService } from '../../shared/services/atoms.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-url-connect',
  templateUrl: './url-connect.component.html',
  styleUrls: ['./url-connect.component.css']
})
export class UrlConnectComponent implements OnInit {

  private url: string;
  form: FormGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder, 
                      private service: UrlConnectService,
                      private atomsService: AtomsService,
                      private router: Router) {
      this.form = fb.group({
        url: ''
      });
   }

  ngOnInit() {
  }

  fetchJson() {
    console.log(this.url);
    this.service.get(this.url)
      .subscribe(res => {
        console.log(res);
        // change the atoms to be visualized
        this.visualizeResult(res);
      }, err => {
        console.log(err);
      })
  }

  private visualizeResult(res) {
        this.atomsService.changeItem(res.response);
        this.router.navigate(["network"]);
    }

}
