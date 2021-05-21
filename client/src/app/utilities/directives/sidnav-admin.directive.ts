import { Directive, HostBinding } from '@angular/core';
import { store } from '../redux/store';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Directive({
  selector: '[appSidenavAdminDirective]'
})
export class SidenavAdminDirective {

  @HostBinding("style.color") public color: string;

  private isAdmin: boolean = this.authServcie.auth.user.isAdmin

  private isMobile: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authServcie : AuthService
  ) {

    this.color = "white"
    // this.isMobile.subscribe(
    //   (isMobile : boolean) => {
    //     if (isMobile) {
    //     }
    //     else {
    //       this.isAdmin
    //         ? this.color = "white"
    //         : this.color = "white"
    //     }
    //   })

  }

}
