import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {TranslateService} from "./translate.service";
import {TranslatePipe} from "./translate.pipe";
import {TRANSLATION_PROVIDERS} from "./translations";

@NgModule({
    declarations: [
        TranslatePipe
    ],
    imports: [
        CommonModule,
    ],
    providers: [TranslateService,TRANSLATION_PROVIDERS],
    exports :[TranslatePipe]
})
export class TranslateModule { }
