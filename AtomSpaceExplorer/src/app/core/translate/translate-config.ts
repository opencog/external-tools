export class TranslateConfig{
    private static _currentLang:string;
    private static _currentLangFlag:string;

    public static setCurrentLang(lang){
        this._currentLang = lang
    }

    public static get currentLang(){
        return this._currentLang;
    }
    public static setCurrentLangFlag(flag){
        this._currentLangFlag = flag
    }

    public static get currentLangFlag(){
        return this._currentLangFlag;
    }

}
