
import { Component, OnInit } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { SocialUser } from "angularx-social-login";

import { UserModel } from 'src/app/utilities/models/user-model';
import { store } from 'src/app/utilities/redux/store';
import { AuthGoogleService } from 'src/app/utilities/services/auth-google.service';
import { AuthService } from 'src/app/utilities/services/auth.service';
import { DialogService } from 'src/app/utilities/services/dialog.service';

@Component({
  selector: 'app-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.scss']
})
export class GoogleSignInComponent implements OnInit {

  public googleUser: SocialUser = new SocialUser();
  public loggedIn: boolean;
  public googleLogo: string = "assets/images/Google__G__Logo.svg"

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthService,
    private authGoogleService: AuthGoogleService,
    private dialogService: DialogService

  ) {
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogo));
  }


  ngOnInit(): void {
    // console.log(window.env.GOOGLE_CLIENT_ID)
    this.authGoogleService.authStatus()
  }

  public async signInWithGoogle() {
    await this.authGoogleService.signInWithGoogle()
    this.googleLogin()
  } 

  private googleLogin(): void {

    const socialUser = store.getState().auth.socialUser

    if (socialUser) {
      this.authService.googleLogin(socialUser.email).subscribe(
        (user: UserModel) => this.authService.handleRoleRoute(user),
        (err) => this.dialogService.handleErrorDialog(err)
      )
    }
  }



}
