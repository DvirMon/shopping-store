import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
})
export class AuthDialogComponent {


  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private tokenService: TokenService,


  ) { }


  // get new refresh token when refresh token expired
  public refreshExpireToken() {
    this.tokenService.getRefreshTokenWhenExpired().subscribe(
      () => this.dialogRef.close()
    )
  }

}
