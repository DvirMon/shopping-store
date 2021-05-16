import { Component } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/utilities/models/user-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public registerForm: FormGroup
  public isMobile : Observable<boolean> = this.formService.isMobile()
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


  // end of form section

  // request section

  public onSubmit() {
    const user: UserModel = { ...this.registerForm.controls }

    this.authService.register(user).subscribe(
      (user: UserModel) => this.router.navigateByUrl(`/home}`)
    )
  }
  // end of request section

  public handleCaptcha(captcha) {
    this.captcha = captcha
  }
}





