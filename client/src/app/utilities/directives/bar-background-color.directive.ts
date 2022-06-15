import { Directive, HostBinding } from '@angular/core';
import { AuthService } from 'src/app/feat-modules/auth/auth.service';

@Directive({
  selector: '[appBarBackgroundColor]'
})
export class BarBackgroundColorDirective {

  @HostBinding("style.backgroundColor") public backgroundColor: string;
  @HostBinding("style.color") public color: string;

  public isAdmin: boolean = this.authService.auth.user.isAdmin

  constructor(
    private authService : AuthService
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
