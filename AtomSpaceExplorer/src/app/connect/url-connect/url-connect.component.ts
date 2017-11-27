import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlConnectService } from './url-connect.service';
import { AtomsService } from '../../shared/services/atoms.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { configs } from '../../app.config';

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
  private subscription = null;

  // Sample data file in ./src/assets/ folder
  // Filename is configured in ./src/app/app.config.ts
  private fileJSON = './../../../assets/' + configs.sample_data_file;

  constructor( @Inject(FormBuilder) fb: FormBuilder,
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
    this.errMsg = '';
    this.connecting = true;
    this.subscription = this.service.get(this.url)
      .subscribe(res => {
        // const json = JSON.stringify(res);
        // console.log(json);
        const numAtoms = res.result.atoms.length;
        // console.log(res);
        // console.log('Fetched ' + numAtoms + ' atoms from ' + this.fileJSON);
        this.connecting = false;
        this.localStorageService.set(this.urlKey, this.url);

        if (numAtoms > this.maxAtoms) {
          this.errMsg = 'Fetched Atoms count (' + numAtoms + ') exceeds currently supported maximum (' + this.maxAtoms + ').';
          return;
        }
        // change the atoms to be visualized
        this.visualizeResult(res);
      }, err => {
        console.log(err);
        this.errMsg = err.message;
        this.connecting = false;
      });
  }

  fetchSampleJson() {
    console.log('Fetching data from file ' + this.fileJSON);
    this.errMsg = '';
    this.connecting = true;
    this.service.get(this.fileJSON)
      .subscribe(res => {
        const numAtoms = res.result.atoms.length;
        // console.log(res);
        // console.log('Fetched ' + numAtoms + ' atoms from ' + this.fileJSON);
        this.connecting = false;

        if (numAtoms > this.maxAtoms) {
          this.errMsg = 'Fetched Atoms count (' + numAtoms + ') exceeds currently supported maximum (' + this.maxAtoms + ').';
          return;
        }
        // change the atoms to be visualized
        this.visualizeResult(res);
      }, err => {
        console.log(err);
        this.errMsg = err.message;
        this.connecting = false;
      });
  }

  private visualizeResult(res) {
    this.atomsService.changeItem(res);
    this.router.navigate(['network']);
  }

  private reset() {
    this.errMsg = '';
    this.url = '';
    this.localStorageService.remove(this.urlKey);
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }
}
