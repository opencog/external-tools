import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlConnectService } from './url-connect.service';
import { OpencogAPIService } from './../../shared/services/opencog_API.service';
import { AtomService, AtomServiceData } from 'ng2-atomspace-visualizer';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { configs } from '../../app.config';
import { TranslateConfig } from '../../core/translate/translate-config';
import { TranslateService } from '../../core/translate/translate.service';

// Default Unordered (Symmetric) Link types
//
// Note: This list was generated via the following Scheme on CogServer
// (use-modules (opencog pln))            ;; Include NLP types.
// (cog-get-all-subtypes 'UnorderedLink)  ;; Note: This cmd was added in Jan '18 per github.com/opencog/atomspace/pull/1516.
const defUnorderedLinktypes = [ 'AbsentLink', 'AndLink', 'CosenseLink', 'EqualLink', 'EquivalenceLink', 'ExtensionalEquivalenceLink',
                                'ExtensionalSimilarityLink', 'IdenticalLink', 'IntensionalEquivalenceLink', 'IntensionalSimilarityLink',
                                'JoinLink', 'LgOr', 'NotLink', 'OrLink', 'ParallelLink', 'SetLink', 'SimilarityLink',
                                'SymmetricHebbianLink', 'SymmetricInverseHebbianLink', 'TypeChoice', 'TypeSetLink' ];

@Component({
  selector: 'app-url-connect',
  templateUrl: './url-connect.component.html',
  styleUrls: ['./url-connect.component.css']
})
export class UrlConnectComponent implements OnInit {
  private urlKey = 'ase-fetch-url';
  private maxAtoms = 2500;
  private subscription = null;
  private unorderedLinkTypesArr: string[] = defUnorderedLinktypes;

  public form: FormGroup;
  public url: string;
  public errMsg = '';
  public connecting = false;

  // Sample data file in ./src/assets/ folder
  // Filename is configured in ./src/app/app.config.ts
  private fileJSON = 'assets/' + configs.sample_data_file;

  constructor(@Inject(FormBuilder) fb: FormBuilder,
    private service: UrlConnectService,
    private cogAPIService: OpencogAPIService,
    private atomsService: AtomService,
    private router: Router,
    private translate: TranslateService,
    private localStorageService: LocalStorageService) {
    this.form = fb.group({
      url: ''
    });
  }

  // Init
  ngOnInit() {
    const savedURL: string = this.localStorageService.get(this.urlKey);
    if (savedURL !== null) {
      this.url = savedURL;
    }
  }

  // Fetch results from a CogServer (or from a built-in sample json file located in the assets folder)
  fetchJson() {
    console.log('\n' + 'Fetching from ' + this.url);

    // Shouldn't get here as Fetch button is disabled unless something is entered into URL text field
    if (!this.url) {
      this.errMsg = 'Invalid URL';
      return;
    }

    // Handle loading sample data from ./assets.  I.E. 'assets/atoms.sample1.json'
    if (this.url.endsWith('.json')) {
      // Retrieving sample *.json files from ./assets
    } else {
      // Standard fetch from Cog Server AtomSpace API
      // Expecting url like http://localhost:5000. Also accept http://localhost:5000/,
      // in which case the trailing slash will be removed for the user
      this.url = this.url.replace(/(\/$)/, '');

      this.fetchLinkTypes(this.url);
    }

    this.errMsg = '';
    this.connecting = true;
    this.subscription = this.service.get(this.url)
      .subscribe(res => {
        // const json = JSON.stringify(res); console.log(json);
        const numAtoms = res.result.atoms.length;
        // console.log(res);
        console.log('Fetched ' + numAtoms + ' atoms from ' + this.url);
        this.localStorageService.set(this.urlKey, this.url);

        if (numAtoms > this.maxAtoms) {
          this.errMsg = 'Fetched Atoms count (' + numAtoms + ') exceeds currently supported maximum (' + this.maxAtoms + ').';
          return;
        }
        // change the atoms to be visualized
        this.visualizeResult(res);
      }, err => {
        this.connecting = false;
        this.errMsg = err.message;
        console.log(err);
      });
  }

  // Load sample data
  fetchSampleJson() {
    console.log('\n' + 'Loading sample data from file ' + this.fileJSON);
    this.errMsg = '';
    this.connecting = true;
    this.service.get(this.fileJSON)
      .subscribe(res => {
        // const json = JSON.stringify(res); console.log(json);
        const numAtoms = res.result.atoms.length;
        // console.log(res);
        console.log('Fetched ' + numAtoms + ' atoms from ' + this.fileJSON);

        if (numAtoms > this.maxAtoms) {
          this.errMsg = 'Fetched Atoms count (' + numAtoms + ') exceeds currently supported maximum (' + this.maxAtoms + ').';
          return;
        }
        // change the atoms to be visualized
        this.visualizeResult(res);
      }, err => {
        this.connecting = false;
        this.errMsg = err.message;
        console.log(err);
      });
  }

  // Fetch unordered link types (used for filter menu)
  fetchLinkTypes(url: string) {
    // console.log('\n' + 'Fetching unordered link types from ' + url);
    this.errMsg = '';
    this.connecting = true;
    this.subscription = this.cogAPIService.getUnorderedLinkTypes(url)
      .subscribe(res => {
        // const json = JSON.stringify(res); console.log(json);
        const unorderedLinkTypes: string = res.response;
        const unorderedLinkTypesTrimmed: string = unorderedLinkTypes.trim().slice(1, -1);  // Discard open/closing parentheses.
        this.unorderedLinkTypesArr = unorderedLinkTypesTrimmed.split(' ').sort();
        console.log('Fetched ' + this.unorderedLinkTypesArr.length + ' unordered link types from ' + url);
        // console.log(this.unorderedLinkTypesArr);
      }, err => {
        console.log(err);
        if (err.status === 500) {
          console.log('cog-get-all-subtypes command not supported. Unable to fetching unordered link types');
        }
        this.errMsg = err.message;
        this.connecting = false;
      });
  }

  // Display visualizer
  private visualizeResult(res) {
    const as_data: AtomServiceData = { atoms: null, unordered_linktypes: null, custom_style: null, language: null };

    // Configure inputs
    as_data.atoms = res;
    if (this.unorderedLinkTypesArr !== null) {
      as_data.unordered_linktypes = this.unorderedLinkTypesArr;
    }
    as_data.language = this.translate.currentLang;

    // Invoke atom service
    this.atomsService.changeItem(as_data);

    // Navigate to visualizer chart
    this.router.navigate(['cog-visualizer']);
  }

  // Reset form
  public reset() {
    this.connecting = false;
    this.errMsg = '';
    this.url = '';
    this.localStorageService.remove(this.urlKey);
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  // Cancel form
  public cancel() {
    this.connecting = false;
    this.errMsg = '';

    // Navigate to home page
    this.router.navigate(['']);
  }
}
