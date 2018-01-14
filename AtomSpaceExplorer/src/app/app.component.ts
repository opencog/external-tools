import { Component, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cog';
  private atoms: any = null;
  private style: any = null;

  constructor(public toastr: ToastsManager, vRef: ViewContainerRef, private route: ActivatedRoute) {
    this.toastr.setRootViewContainerRef(vRef);
    console.log(route.root);
    this.atoms = '';
    this.style = '';
  }
}
