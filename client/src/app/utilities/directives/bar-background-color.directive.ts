import { Directive, HostBinding } from '@angular/core';
import { store } from '../redux/store';

@Directive({
  selector: '[appBarBackgroundColor]'
})
export class BarBackgroundColorDirective {

  @HostBinding("style.backgroundColor") public backgroundColor: string;
  @HostBinding("style.color") public color: string;

  public isAdmin: boolean = store.getState().auth.isAdmin

  constructor(
  ) { 
    if (this.isAdmin) {
    this.backgroundColor = "#f44336"
    this.color = "white"
    }
  }

}
