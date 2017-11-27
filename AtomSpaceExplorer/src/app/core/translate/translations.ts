import { InjectionToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_CN_TRANS } from './lang-cn';
import { LANG_DE_TRANS } from './lang-de';
import { LANG_ES_TRANS } from './lang-es';
import { LANG_FR_TRANS } from './lang-fr';
import { LANG_IT_TRANS } from './lang-it';
import { LANG_JP_TRANS } from './lang-jp';

// translation token
export const DICTIONARY = new InjectionToken ('translations');

// all translations
const dictionary = {
    'en': LANG_EN_TRANS,
    'cn': LANG_CN_TRANS,
    'de': LANG_DE_TRANS,
    'es': LANG_ES_TRANS,
    'fr': LANG_FR_TRANS,
    'it': LANG_IT_TRANS,
    'jp': LANG_JP_TRANS
};

// providers
export const TRANSLATION_PROVIDERS = { provide: DICTIONARY, useValue: dictionary };
