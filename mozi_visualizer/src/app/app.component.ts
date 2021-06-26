import {Component, ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public toastr: ToastsManager, vRef: ViewContainerRef, private route:ActivatedRoute) {
    this.toastr.setRootViewContainerRef(vRef);
    console.log(route.root);
  }



}
