import {Directive, OnInit, OnDestroy, ElementRef} from "@angular/core";
/**
 * Created by tsadik on 4/24/17.
 */
declare var $: any

@Directive({
    selector: '.ui.modal'
})
export class InitializeModal implements OnInit, OnDestroy {

    constructor(private el: ElementRef) {
    }

    public ngOnInit() {
        // $(this.el.nativeElement).modal('show');
    }

    public ngOnDestroy() {
        $(this.el.nativeElement).modal('destroy');
    }
}