/**
 * Created by tsadik on 4/26/17.
 */
import {Component, EventEmitter, Input, Output, AfterViewInit} from '@angular/core';
declare var $: any

@Component({
    selector:'confirm-dialog',
    templateUrl:'confirmation-dialog.template.html'
})
export class ConfirmationDialogComponent  implements AfterViewInit{

    ngAfterViewInit(): void {
        // $('.small.modal')
        //     .modal('show')
        // ;
    }

    // @Input('message')
    // message = {title:'Delete Item', msg:'Do you want to delete this Item?',icon:"trash"};
    //
    // @Input()
    // _modalId:string = "confirm_modal";
    //
    // @Output()
    // choiceEvent:EventEmitter<any> = new EventEmitter<any>();
    //
    // cancel(){
    //     this.choiceEvent.emit({confirmed:false});
    // }
    //
    // confirm(){
    //     this.choiceEvent.emit({confirmed:true,});
    // }


}
