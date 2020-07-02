import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/utilities/services/auth.service';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
})
export class AuthDialogComponent  {

  constructor(
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private authService: AuthService,

  ) { }

  // get new refresh token when refresh token expired
  public refreshExpireToken() {
    this.authService.getRefreshTokenWhenExpired().subscribe(
      () => this.dialogRef.close()
    )
  }

} 
