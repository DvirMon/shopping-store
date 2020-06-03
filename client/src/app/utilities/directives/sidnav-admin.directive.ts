import { Directive, HostBinding } from '@angular/core';
import { store } from '../redux/store';

@Directive({
  selector: '[appSidenavAdminDirective]'
})
export class SidenavAdminDirective {

  @HostBinding("style.width") public width: string;

  public isAdmin: boolean = store.getState().auth.isAdmin

  constructor(
  ) { 
    if (this.isAdmin) {
    this.width = "400px"
    }
  }

}
