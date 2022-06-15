import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { store } from 'src/app/utilities/redux/store';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-products-bar',
  templateUrl: './products-bar.component.html',
  styleUrls: ['./products-bar.component.scss']
})
export class ProductsBarComponent {

  public isAdmin: boolean = this.authService.auth.user.isAdmin

  public isMobile$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) { }

}
