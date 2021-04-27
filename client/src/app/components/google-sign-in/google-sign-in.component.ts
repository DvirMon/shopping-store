// ANGULAR
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

// MODELS
import { SocialUser } from "angularx-social-login";
import { UserModel } from 'src/app/utilities/models/user-model';

// SERVICES
import { GoogleService } from 'src/app/services/google.service';
import { AuthService } from 'src/app/services/auth.service';
import { DialogService } from 'src/app/services/dialog.service';

// REDUX
import { store } from 'src/app/utilities/redux/store';

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
    private googleService: GoogleService,
    private dialogService: DialogService

  ) {
    this.matIconRegistry.addSvgIcon(
      "logo",
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.googleLogo));
  }


  ngOnInit(): void {
    this.googleService.authStatus()
  }

  public async signInWithGoogle() {
    await this.googleService.signInWithGoogle()
    this.googleLogin()
  }

  private googleLogin(): void {

    const socialUser: SocialUser = store.getState().auth.socialUser

    console.log(socialUser)

    if (socialUser) {
      this.authService.loginGoogle(socialUser).subscribe(
        (user: UserModel) => this.authService.handleRoleRoute(user),
        (err) => this.dialogService.handleErrorDialog(err)
      )
    }
  }



}
