import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { FormService } from 'src/app/services/form.service';
import { AuthService } from 'src/app/services/auth.service';

import { UserModel } from 'src/app/utilities/models/user-model';

import { store } from 'src/app/utilities/redux/store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup

  public isLogin: boolean
  public isCartActive: boolean
  public serverError: string

  public isMobile : Observable<boolean> = this.formService.isMobile()

  constructor(
    private router: Router,
    private formService: FormService,
    private authService: AuthService,
    public user: UserModel,
  ) { }


  ngOnInit(): void {
    this.createForm()
    this.subscribeToStore()
  }

  // subscription section
  public subscribeToStore(): void {
    store.subscribe(() => {
      this.isLogin = store.getState().auth.isLogin
      this.user = store.getState().auth.user
      this.isCartActive = store.getState().cart.isCartActive
    }
    )
    this.isLogin = store.getState().auth.isLogin
    this.user = store.getState().auth.user
    this.isCartActive = store.getState().cart.isCartActive
  }
  // end of subscription section


  // FORM SECTION

  public createForm(): void {
    this.loginForm = this.formService.loginForm()
  }


  // LOGIC SECTION

  // method to handle login
  public onSubmit(): void {

    this.authService.login(this.loginForm.value).subscribe(
      (user: UserModel) => this.authService.handleRoleRoute(user),
      (err) => this.authService.serverError.next(err.error)
    )
  }

  // navigate to register page
  public onRegister(): Promise<boolean> {
    this.authService.isRegister.next(true)
    return this.router.navigateByUrl(`/register`)
  }

  // navigate to restart password
  public onForget():  Promise<boolean> {
    return this.router.navigateByUrl(`/auth/reset`)
  }

  // end logic section

}
