import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { Router } from '@angular/router';

import { FormService } from 'src/app/services/form.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service';
import { ResetService } from '../reset/reset.service';

@Component({
  selector: 'app-reset-new-password',
  templateUrl: './reset-new-password.component.html',
  styleUrls: ['./reset-new-password.component.scss']
})
export class ResetNewPasswordComponent {

  @ViewChild(MatInput) input: HTMLInputElement;

  @Input() public method: string
  public newPassword: UntypedFormGroup = this.formService.newPasswordForm();
  public serverError: string

  private snacBarRef

  constructor(
    private router: Router,
    private formService: FormService,
    private resetService: ResetService,
    private authService: AuthService,

    private snackBar: MatSnackBar
  ) { }


  // SUBSCRIBTION SECTION

  public onSubmit() {

    this.resetService.setNewPasswored(this.newPassword.value).subscribe(
      (success) => {
        sessionStorage.removeItem("confirmation")
        let snacBarRef = this.snackBar.open("Password reset success!", 'Dismiss');
        snacBarRef.afterDismissed().subscribe(
          () => {
            this.router.navigateByUrl('/auth/login')
          }
        )
      },
      (err) => {
        console.log(err)
        this.authService.serverError.next(err.error)
      }
    )



  }





}
