/**
 * Created by tsadik on 3/27/17.
 */
import { Component, OnInit } from '@angular/core';
import { TranslateConfig } from '../../core/translate/translate-config';
import { TranslateService } from '../../core/translate/translate.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { AtomService, AtomServiceData } from 'ng2-atomspace-visualizer';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
    selector: 'main-container',
    templateUrl:'../templates/main-container.component.html',
    styleUrls: ['../../../assets/semantic/semantic.min.css'],
})

export class MainContainer implements OnInit{
    private langKey = 'ase-language';
    public supportedLanguages: any[];

    constructor(private _authService: AuthService, private _translate: TranslateService, private _atomsService: AtomService,
      private localStorageService: LocalStorageService) { }

    ngOnInit() {
        this.supportedLanguages = [
            { display: 'English', value: 'en', flag: 'us'},
            { display: 'Chinese', value: 'cn', flag: 'cn'},
            { display: 'French', value: 'fr', flag: 'fr'},
            { display: 'German', value: 'de', flag: 'de'},
            { display: 'Italian', value: 'it', flag: 'it'},
            { display: 'Japanese', value: 'jp', flag: 'jp'},
            { display: 'Spanish', value: 'es', flag: 'es'}
          ];
        const savedLangKey: string = this.localStorageService.get(this.langKey);
        if (savedLangKey === null) {
          this.selectLang('en');
        } else {
          this.selectLang(savedLangKey);
        }
    }

    private isCurrentLang(lang: string) {
        return lang === this._translate.currentLang;
    }

    private selectLang(lang: string) {
        this._translate.use(lang);
        TranslateConfig.setCurrentLang(lang);

        // Persist it as sticky setting
        this.localStorageService.set(this.langKey, lang);

        /// Set language of the atomspace-visualizer module so it matches the container app
        const as_data: AtomServiceData = { atoms: null, unordered_linktypes: null, custom_style: null, language: lang };
        this._atomsService.changeItem(as_data);
    }

    private setLanguage(lang){
        let key = lang.value.value;
        this.selectLang(key);
    }

    // private signOut(){
    //     this._authService
    //         .signOut();
    // }
}