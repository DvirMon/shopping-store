import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private authService: AuthService,

  ) { }

  ngOnInit(): void {
  }

  public refreshExpireToken() {
    this.authService.getRefreshTokenWhenExpired().subscribe(
      () => this.dialogRef.close()
    )
  }

} 
