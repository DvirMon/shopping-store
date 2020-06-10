import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
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

  @ViewChild('drawer') drawer;

  public user: UserModel = new UserModel()
  public opened: boolean = true;
  public isLogin: boolean = false;
  public isRegister: boolean = false;
  public isAdmin: boolean = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router


  ) { }

  ngOnInit(): void {

    this.storeSubscribe()
    this.subscribeToSubject()

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

  private subscribeToSubject() {
    this.authService.isRegister.subscribe(
      (isRegister) => this.isRegister = isRegister
    )
  }

  public onLogin() {
    this.router.navigateByUrl('/login')
    this.isRegister = false
  }

  public onLogOut() {
    this.authService.logout()
  }


  public onHome() {
    this.authService.handleRoleRoute(this.user)
  }

}
