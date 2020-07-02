import { Directive, HostBinding } from '@angular/core';
import { store } from '../redux/store';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';

@Directive({
  selector: '[appSidenavAdminDirective]'
})
export class SidenavAdminDirective {

  @HostBinding("style.color") public color: string;

  private isAdmin: boolean = store.getState().auth.isAdmin

  private isMobile: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {

    this.isMobile.subscribe(
      (isMobile : boolean) => {
        if (isMobile) {
          this.color = "black"
        }
        else {
          this.isAdmin
            ? this.color = "white"
            : this.color = "black"
        }
      })

  }

}
