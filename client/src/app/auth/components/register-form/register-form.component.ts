
import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/utilities/services/form.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/utilities/models/user-model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  public registerForm: FormGroup
  public captcha: boolean = false;

  constructor(
    private formService: FormService,
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  // form section
  public createForm() {
    this.registerForm = this.formService.registerForm()
  }

  get personalDetails() {
    return this.registerForm.get('personalDetails') as FormGroup
  }

  get authDetails() {
    return this.registerForm.get('authDetails') as FormGroup
  }

  // get values access on dom
  get personal() {
    return this.registerForm.controls['personalDetails']['controls']
  }

  get auth() {
    return this.registerForm.controls['authDetails']['controls']
  }


  // end of form section

  // request section

  public onSubmit() {
    const user: UserModel = { ...this.personalDetails.value, ...this.authDetails.value }
    this.authService.register(user).subscribe(
      (user: UserModel) => this.router.navigateByUrl(`/home/${user._id}`)
    )
  }
  // end of request section

  public handleCaptcha(captcha) {
    this.captcha = captcha
  }
}


