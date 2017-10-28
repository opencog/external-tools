import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlConnectService } from './url-connect.service';
import { AtomsService } from '../../shared/services/atoms.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-url-connect',
  templateUrl: './url-connect.component.html',
  styleUrls: ['./url-connect.component.css']
})
export class UrlConnectComponent implements OnInit {

  private urlKey = 'ase-fetch-url';
  private maxAtoms = 2500;
  private url: string;
  form: FormGroup;
  private errMsg = '';
  private connecting = false;

  constructor(@Inject(FormBuilder) fb: FormBuilder,
                      private service: UrlConnectService,
                      private atomsService: AtomsService,
                      private router: Router,
                      private localStorageService: LocalStorageService) {
      this.form = fb.group({
        url: ''
      });
   }

  ngOnInit() {
    const savedURL: any = this.localStorageService.get(this.urlKey);
    if (savedURL !== null) {
      this.url = savedURL;
    }
  }

  fetchJson() {
    console.log('Fetching data from ' + this.url);
    this.connecting = true;
    this.service.get(this.url)
      .subscribe(res => {
        const numAtoms = res.result.atoms.length;
        console.log(res);
        console.log('Fetched ' + numAtoms + ' atoms, complete=' + res.result.complete +
          ', skipped=' + res.result.skipped + ' from ' + this.url);
        this.connecting = false;
        this.localStorageService.set(this.urlKey, this.url);

        if (numAtoms > this.maxAtoms) {
          this.errMsg = 'Fetched Atoms count (' + numAtoms + ') exceeds currently supported maximum (' + this.maxAtoms + ').';
          this.connecting = false;
          return;
        }
        // change the atoms to be visualized
        this.visualizeResult(res);
      }, err => {
          console.log(err);
        this.errMsg = 'Can\'t Connect to server.';
        this.connecting = false;
      });
  }

  private visualizeResult(res) {
        this.atomsService.changeItem(res);
        this.router.navigate(['network']);
    }

  private reset() {
      this.url = '';
      this.localStorageService.remove(this.urlKey);
  }
}
