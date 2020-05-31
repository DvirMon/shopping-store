import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { Router } from '@angular/router';
import { store } from 'src/app/utilities/redux/store';
import { UserModel } from 'src/app/utilities/models/user-model';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  public user: UserModel = new UserModel()
  public opened: boolean;
  public isLogin: boolean
  public isAdmin: boolean
  public login: Subscription
  @ViewChild('drawer') drawer;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    

  ) { }

  ngOnInit(): void {

    this.storeSubscribe()

  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  public storeSubscribe() {
    store.subscribe(() => {
      this.isLogin = store.getState().auth.isLogin
      this.isAdmin = store.getState().auth.isAdmin
      this.user = store.getState().auth.user
    }) 
    this.isLogin = store.getState().auth.isLogin
    this.isAdmin = store.getState().auth.isAdmin
    this.user = store.getState().auth.user
  }

  public onLogOut() {
    this.authService.logout()
  }

  public onHome() {
    this.authService.handleRoleRoute(this.user)
  }

  public onProducts() { 
    this.router.navigateByUrl("/admin/products-table")
  }

}
