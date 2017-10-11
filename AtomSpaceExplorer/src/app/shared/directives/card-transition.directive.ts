/**
 * Created by tsadik on 4/24/17.
 */
import {Directive, OnInit, OnDestroy, ElementRef} from "@angular/core";
/**
 * Created by tsadik on 4/24/17.
 */
declare var $: any

@Directive({
    selector: '.card'
})
export class CardTransition implements OnInit, OnDestroy {

    constructor(private el: ElementRef) {
    }

    public ngOnInit() {
        $(this.el.nativeElement).transition({
            animation : 'pulse',
            reverse   : true,
            interval  : 200
        });
    }

    public ngOnDestroy() {
        // $(this.el.nativeElement).transition('fade');
    }
}