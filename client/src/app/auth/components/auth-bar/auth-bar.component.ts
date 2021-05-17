import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { UserModel } from 'src/app/utilities/models/user-model';
import { AuthService } from 'src/app/services/auth.service';

import { store } from 'src/app/utilities/redux/store';
import { GoogleService } from 'src/app/services/google.service';

@Component({
  selector: 'app-auth-bar',
  templateUrl: './auth-bar.component.html',
  styleUrls: ['./auth-bar.component.scss']
})
export class AuthBarComponent implements OnInit {

  @ViewChild('drawer') drawer;

  private authState = this.authService.auth
  public isLogin: boolean = this.authState.isLogin;
  public user: UserModel = this.authState.user

  public isRegister: boolean = false;
  public opened: boolean = true;

  constructor(
    private authService: AuthService,
    private googleService: GoogleService,
    private router: Router,



  ) { }

  ngOnInit(): void {

    // this.subscribeToStore()
    this.subscribeToSubject()

  }

  // SUBSCRIPTION SECTION

  public subscribeToStore(): void {
    // store.subscribe(() => {
    //   this.isLogin = store.getState().auth.isLogin
    //   this.isAdmin = store.getState().auth.isAdmin
    //   this.user = store.getState().auth.user
    // })
    // this.isLogin = store.getState().auth.isLogin
    // this.isAdmin = store.getState().auth.isAdmin
    // this.user = store.getState().auth.user
  }

  private subscribeToSubject(): void {
    this.authService.isRegister.subscribe(
      (isRegister) => this.isRegister = isRegister
    )
  }

  // end of subscription section


  // LOGIC SECTION

  // navigate login
  public onLogin(): Promise<boolean> {
    this.isRegister = false
    return this.router.navigateByUrl('auth/login')
  }

  // navigate logout
  public onLogOut(): Promise<boolean> {
    return this.authService.logout()
  }

  // navigate to register page
  public onRegister(): Promise<boolean> {
    this.authService.isRegister.next(true)
    return this.router.navigateByUrl(`auth/register`)
  }


  public onHome(): Promise<boolean> {

    if (this.isLogin) {
      return this.authService.handleRoleRoute()
    }

    return this.router.navigateByUrl(`/`)

  }

  // end of logic section

}
