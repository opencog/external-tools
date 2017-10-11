import {Directive, OnInit, OnDestroy, ElementRef} from "@angular/core";
/**
 * Created by tsadik on 4/24/17.
 */
declare var $: any

@Directive({
    selector: '.ui.dropdown'
})
export class InitializeDropdown implements OnInit, OnDestroy {

    constructor(private el: ElementRef) {
    }

    public ngOnInit() {
        $(this.el.nativeElement).dropdown();
    }

    public ngOnDestroy() {
        $(this.el.nativeElement).dropdown('destroy');
    }
}