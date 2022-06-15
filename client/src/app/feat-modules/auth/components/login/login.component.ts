import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { FormService, LoginForm } from 'src/app/services/form.service';

import { User } from 'src/app/utilities/models/user.model';

import { Observable } from 'rxjs';
import { GoogleService } from 'src/app/services/google.service';
import { DialogService } from 'src/app/services/dialog.service';
import { AuthService, Login } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup<LoginForm>;

  isLogin: boolean = this.authService.auth.isLogin;
  serverError: string;

  isMobile: Observable<boolean> = this.formService.isMobile();

  user: User;

  constructor(
    private router: Router,
    private formService: FormService,
    private authService: AuthService,
    private googleService: GoogleService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.googleService.authStatus();
  }

  // FORM SECTION

  createForm(): void {
    this.loginForm = this.formService.loginForm();
  }

  // HTTP SECTION

  // login
  onSubmit(): void {
    const value = this.loginForm.value as Login;

    this.authService.login(value).subscribe(
      (user: User) => this.authService.handleRoleRoute(),
      (err) => this.authService.serverError.next(err.error)
    );
  }

  // login with google
  loginGoogle() {
    this.authService.loginGoogle().subscribe(
      (user: User) => this.authService.handleRoleRoute(),
      (err) => this.dialogService.handleErrorDialog(err)
    );
  }

  // NAVIGATE SECTION

  // navigate to register page
  onRegister(): Promise<boolean> {
    return this.router.navigateByUrl(`/register`);
  }

  // navigate to restart password
  onForget(): Promise<boolean> {
    return this.router.navigateByUrl(`/auth/reset`);
  }
}
