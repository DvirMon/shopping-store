import { Directive, HostBinding } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from 'src/app/feat-modules/auth/auth.service';

import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Directive({
  selector: '[appSidenavAdminDirective]'
})
export class SidenavAdminDirective {

  @HostBinding("style.color") public color: string;

  private isAdmin: boolean = this.authService.auth.user.isAdmin

  private isMobile: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService : AuthService
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
