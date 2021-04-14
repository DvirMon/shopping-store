import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { UserModel } from 'src/app/utilities/models/user-model';
import { AuthService } from 'src/app/utilities/services/auth.service';

import { store } from 'src/app/utilities/redux/store';
import { AuthGoogleService } from 'src/app/utilities/services/auth-google.service';

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
    private authService: AuthService,
    private authGoogleService: AuthGoogleService,
    private router: Router,



  ) { }

  ngOnInit(): void {

    this.subscribeToStore()
    this.subscribeToSubject()

  }

  // subscription section

  public subscribeToStore(): void {
    store.subscribe(() => {
      this.isLogin = store.getState().auth.isLogin
      this.isAdmin = store.getState().auth.isAdmin
      this.user = store.getState().auth.user
    })
    this.isLogin = store.getState().auth.isLogin
    this.isAdmin = store.getState().auth.isAdmin
    this.user = store.getState().auth.user
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
  public async onLogOut(): Promise<boolean> {
    await this.authGoogleService.signOutWithGoogle();
    return this.authService.logout()
  }

  // navigate to register page
  public onRegister(): Promise<boolean> {
    this.authService.isRegister.next(true)
    return this.router.navigateByUrl(`auth/register`)
  }


  public onHome(): Promise<boolean> {

    if (this.isLogin) {
      return this.authService.handleRoleRoute(this.user)
    }

    return this.router.navigateByUrl(`/`)

  }

  // end of logic section

}
