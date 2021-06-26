/**
 * Created by tsadik on 2/25/17.
 */
import {Directive, HostListener, Output, EventEmitter} from '@angular/core';

@Directive({ selector: '[moz-scroll]' })

export class ScrollDirective {
  @Output() onTableScroll = new EventEmitter();

  constructor() {}

  @HostListener('scroll', ['$event']) private onScroll($event:Event):void {
    this.onTableScroll.emit($event);
  };

}
