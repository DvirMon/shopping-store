import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { ResetService } from 'src/app/services/reset.service';

@Component({
  selector: 'app-reset-new-password',
  templateUrl: './reset-new-password.component.html',
  styleUrls: ['./reset-new-password.component.scss']
})
export class ResetNewPasswordComponent {

  @ViewChild(MatInput) input: HTMLInputElement;

  @Input() public method: string

  public newPassword: FormGroup = this.formService.newPasswordForm();
  public serverError: string

  constructor(
    private router: Router,

    private formService: FormService,
    private resetService: ResetService,
    private authServcie: AuthService
  ) { }


  // SUBSCRIBTION SECTION

  public onSubmit() {

    this.resetService.setNewPasswored(this.newPassword.value).subscribe(
      (success) => {
        sessionStorage.removeItem("confirmation")
        this.router.navigateByUrl('/auth/login')
      },
      (err) => {
        console.log(err)
        this.authServcie.serverError.next(err.error)
      }
    )



  }




}
