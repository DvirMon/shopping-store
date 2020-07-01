import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { FormService } from 'src/app/utilities/services/form.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { ProductsService } from 'src/app/utilities/services/products.service';

import { UserModel } from 'src/app/utilities/models/user-model';

import { store } from 'src/app/utilities/redux/store';


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

  constructor(
    private router: Router,
    private formService: FormService,
    private authService: AuthService,
    private productsService: ProductsService,
    public user: UserModel,
  ) { }

  ngOnInit(): void {

    this.createForm()
    this.subscribeToStore()

  }

  // subscription section
  public subscribeToStore() {
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


  // logic section
  public onLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      (user: UserModel) => {
        return this.authService.handleRoleRoute(user)
      },
      err => {
        this.authService.serverError.next(err.error)
      }
    )
  }

  // navigate to products page
  public toProducts() {
    this.productsService.productsLandingPage()
  }
  
  // navigate to register page
  public onRegister() {
    this.authService.isRegister.next(true)
    this.router.navigateByUrl(`/register`)

  }

  // end logic section

}
