import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup } from '@angular/forms';

import { FormService } from 'src/app/services/form.service';
import { AuthService } from 'src/app/services/auth.service';

import { UserModel } from 'src/app/utilities/models/user.model';

import { store } from 'src/app/utilities/redux/store';
import { Observable } from 'rxjs';
import { SocialUser } from 'angularx-social-login';
import { GoogleService } from 'src/app/services/google.service';
import { DialogService } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: UntypedFormGroup

  public isLogin: boolean = this.authService.auth.isLogin
  public serverError: string

  public isMobile: Observable<boolean> = this.formService.isMobile()

  constructor(
    private router: Router,

    private formService: FormService,
    private authService: AuthService,
    private googleService: GoogleService,
    private dialogService: DialogService,

    public user: UserModel,
  ) { }


  ngOnInit(): void {
    this.createForm()
    this.googleService.authStatus()
  }

  // FORM SECTION

  public createForm(): void {
    this.loginForm = this.formService.loginForm()
  }


  // HTTP SECTION

  // login
  public onSubmit(): void {

    this.authService.login(this.loginForm.value).subscribe(
      (user: UserModel) => this.authService.handleRoleRoute(),
      (err) => this.authService.serverError.next(err.error)
    )
  }


  // login with google
  public loginGoogle() {
    this.authService.loginGoogle().subscribe(
      (user: UserModel) => this.authService.handleRoleRoute(),
      (err) => this.dialogService.handleErrorDialog(err)
    )
  }

  // NAVIGATE SECTION

  // navigate to register page
  public onRegister(): Promise<boolean> {
    return this.router.navigateByUrl(`/register`)
  }

  // navigate to restart password
  public onForget(): Promise<boolean> {
    return this.router.navigateByUrl(`/auth/reset`)
  }


}
