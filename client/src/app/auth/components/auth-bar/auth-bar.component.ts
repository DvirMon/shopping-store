import { Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';

import { UserModel } from 'src/app/utilities/models/user-model';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { isLoggin, userSelecotr } from 'src/app/utilities/ngrx/selectors';
import { AuthState } from 'src/app/utilities/ngrx/state/auth-state';

@Component({
  selector: 'app-auth-bar',
  templateUrl: './auth-bar.component.html',
  styleUrls: ['./auth-bar.component.scss']
})
export class AuthBarComponent {

  private user$: Observable<UserModel> = this.store.select(userSelecotr)
  private isLoggin$: Observable<boolean> = this.store.select(isLoggin)

  constructor(
    private router: Router,
    private store: Store<{ auth: AuthState }>
  ) {
  }

  // NAVIGATE SECTION

  // navigate login
  public onLogin(): Promise<boolean> {
    return this.router.navigateByUrl('auth/login')
  }

  // navigate to register page
  public onRegister(): Promise<boolean> {
    return this.router.navigateByUrl(`auth/register`)
  }

  public onHome(): Promise<boolean> {
    return this.router.navigateByUrl(`/`)
  }

  // end of logic section

}
