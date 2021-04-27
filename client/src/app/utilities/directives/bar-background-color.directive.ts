import { Directive, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { store } from '../redux/store';

@Directive({
  selector: '[appBarBackgroundColor]'
})
export class BarBackgroundColorDirective {

  @HostBinding("style.backgroundColor") public backgroundColor: string;
  @HostBinding("style.color") public color: string;

  public isAdmin: boolean = store.getState().auth.isAdmin

  constructor(
    private router: Router
  ) {
    if (this.isAdmin) {
      this.backgroundColor = "#f44336"
      this.color = "white"
    } else {
      this.backgroundColor = "transparent"
    }

    // console.log(this.router.url)
  }


}
