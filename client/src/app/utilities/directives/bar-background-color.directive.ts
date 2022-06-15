import { Directive, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { store } from '../redux/store';

@Directive({
  selector: '[appBarBackgroundColor]'
})
export class BarBackgroundColorDirective {

  @HostBinding("style.backgroundColor") public backgroundColor: string;
  @HostBinding("style.color") public color: string;

  public isAdmin: boolean = this.authServcie.auth.user.isAdmin

  constructor(
    private authServcie : AuthService
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
