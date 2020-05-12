import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup

  public isLogin: boolean = true
  public hide: boolean = true;
  public serverError: string

  constructor(
    private formService: FormService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formService.loginForm()
  }

  // form section

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }


  // end form section


  public onLogin() {

  }

  public switchMode() {
    this.isLogin = !this.isLogin
  }

}
