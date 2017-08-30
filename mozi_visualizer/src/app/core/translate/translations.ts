import { OpaqueToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import {LANG_CN_TRANS} from "./lang-cn";

// translation token
export const DICTIONARY = new OpaqueToken('translations');

// all translations
const dictionary = {
    'en': LANG_EN_TRANS,
    'cn': LANG_CN_TRANS
};

// providers
export const TRANSLATION_PROVIDERS = { provide:DICTIONARY, useValue: dictionary };