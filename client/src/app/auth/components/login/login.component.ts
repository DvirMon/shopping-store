import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormService } from 'src/app/utilities/services/form.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { UserModel } from 'src/app/utilities/models/user-model';
import { CartService } from 'src/app/utilities/services/cart.service';

import { store } from 'src/app/utilities/redux/store';
import { Router } from '@angular/router';

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
  public user: UserModel = new UserModel()

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private cartServices: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.createForm()
    this.storeSubscribe()
    this.isLogin = store.getState().auth.isLogin

  }

  // subscription section
  public storeSubscribe() {
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


  // form section
  public createForm() {
    this.loginForm = this.formService.loginForm()
  }

  // end form section


  public onLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      (userId : string) => {
        this.router.navigateByUrl(`/home/${userId}`)
      },
      err => {
        this.authService.serverError.next(err.error)
      }
    )
  }

  public onProducts() {
    this.router.navigateByUrl(`/products/beverages/5e91e29b9c08fc560ce2cf32`)
  }

  public onRegister() {
    this.router.navigateByUrl(`/register`)

  }
}
