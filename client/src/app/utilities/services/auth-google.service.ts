import { Injectable } from '@angular/core';

import { FormService } from './form.service';

// GOOGLE SIGN-IN SERVICE
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

// GOOGLE RECAPTCHA
import { ReCaptchaV3Service } from 'ng-recaptcha';

// REDUX
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';

// RXJS
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(
    private socialAuthService : SocialAuthService,
    private reCaptchaV3Service : ReCaptchaV3Service,
    private formService : FormService
  ) { }
   

  public authStatus() {
    this.socialAuthService.authState.subscribe((user) => {
      this.formService.handleStore(ActionType.SocialUser, user)
    });
  }
  
  public async signInWithGoogle() {
    try {
      await this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      
    }
    catch (err) {
      console.log("SIGN-IN")
      console.log(err)
    }
  }
  public async signOutWithGoogle() {
    try {
      if (store.getState().auth.socialUser) {
        await this.socialAuthService.signOut()
      }
    }
    catch (err) {
      console.log("SIGN-OUT")
      console.log(err)
    }
  }

    public getReCaptcha(action: string): Observable<string> {
    return this.reCaptchaV3Service.execute(action)
  }
  
}