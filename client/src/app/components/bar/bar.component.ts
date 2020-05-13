import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { store } from 'src/app/redux/store';
import { UserModel } from 'src/app/models/user-model';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {

  public opened: boolean;
  public isLogin: boolean
  public isAdmin: boolean
  public user: UserModel
  public login: Subscription
  @ViewChild('drawer') drawer;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router

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

  public openSideBar() {
    this.drawer.toggle()
  }

  public handleLogOut() {
    this.authService.logout()
  }

}
