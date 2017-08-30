/**
 * Created by tsadik on 3/27/17.
 */
import {Component, OnInit} from '@angular/core';
import {TranslateConfig} from "../../core/translate/translate-config";
import {TranslateService} from "../../core/translate/translate.service";
import {AuthService} from "../../core/auth/services/auth.service";

@Component({
    selector: 'main-container',
    templateUrl:'../templates/main-container.component.html',
    styleUrls: ['../../../assets/semantic/semantic.min.css'],
})

export class MainContainer implements OnInit{
    public supportedLanguages: any[];

    constructor(private _authService: AuthService,private _translate: TranslateService){}

    ngOnInit() {
        this.supportedLanguages = [
            { display: 'English', value: 'en', flag: "us" },
            { display: 'Chinese', value: 'cn', flag: "cn"}
        ];
        this.selectLang('en');
    }

    private isCurrentLang(lang: string) {
        return lang === this._translate.currentLang;
    }

    private selectLang(lang: string) {
        this._translate.use(lang);
        TranslateConfig.setCurrentLang(lang);
    }

    private setLanguage(lang){
        let key = lang.value.value;
        this.selectLang(key);
    }

    private signOut(){
        this._authService
            .signOut();
    }

}