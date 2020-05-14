import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { AuthService } from 'src/app/services/auth.service';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup

  public isLogin: boolean
  public isCartActive: boolean = false
  public serverError: string
  public store = store

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.createLoginForm()
    this.storeSubscribe()
    this.isLogin = store.getState().auth.isLogin

    // subscription section

  }
  public storeSubscribe() {
    store.subscribe(() =>
      this.isLogin = store.getState().auth.isLogin
    )
  }

  // end of subscription section


  // form section
  public createLoginForm() {
    this.loginForm = this.formService.loginForm()
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }
  // end form section


  public onLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      (userId) => {
        this.router.navigateByUrl(`/home/${userId}`)
      },
      err => {
        this.authService.serverError.next(err.error)
      }
    )
  }
}
