import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { DialogData } from 'src/app/services/dialog.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private tokenService: TokenService,
    private authServie : AuthService,
    private router: Router

  ) {
  }


  // get new refresh token when refresh token expired
  public onClick() {

    if (this.data.payload) {
      this.router.navigateByUrl('/auth/login')
    }
    else {
      this.tokenService.getRefreshTokenWhenExpired(this.authServie.auth.user).subscribe()
    }

    this.dialogRef.close()
  }


}
