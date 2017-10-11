import {Injectable, Inject} from '@angular/core';
import { DICTIONARY } from './translations';


@Injectable()
export class TranslateService {
    private _currentLang: string;

    // inject our translations
    constructor(@Inject(DICTIONARY) private _translations: any) {
    }

    public get currentLang() {
        return this._currentLang;
    }

    public use(lang: string): void {
        this._currentLang = lang;
    }

    private translate(key: string): string {
        let translation = key;

        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
            return this._translations[this.currentLang][key];
        }

        return translation;
    }

    public instant(key: string) {
        return this.translate(key);
    }
}
