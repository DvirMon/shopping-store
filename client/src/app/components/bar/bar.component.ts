import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { UserModel } from 'src/app/utilities/models/user-model';
import { AuthService } from 'src/app/utilities/services/auth.service';

import { store } from 'src/app/utilities/redux/store';

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
    private router: Router


  ) { }

  ngOnInit(): void {

    this.subscribeToStore()
    this.subscribeToSubject()

  }


  public subscribeToStore() {
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
