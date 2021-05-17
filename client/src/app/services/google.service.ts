import { Injectable } from '@angular/core';

import { FormService } from './form.service';

// GOOGLE SIGN-IN SERVICE
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

// GOOGLE RECAPTCHA
import { ReCaptchaV3Service } from 'ng-recaptcha';

// RXJS
import { from, Observable } from 'rxjs';

// NGRX
import { Store } from '@ngrx/store';
import { AuthState } from '../utilities/ngrx/state/auth-state';
import * as AuthActions from '../utilities/ngrx/actions/auth-actions'

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(
    private socialAuthService: SocialAuthService,
    private reCaptchaV3Service: ReCaptchaV3Service,

    private formService: FormService,

    private store: Store<{ auth: AuthState }>
  ) { }


  public authStatus() {
    this.socialAuthService.authState.subscribe((socielUser: SocialUser) => {
      this.store.dispatch(new AuthActions.AddSocielUser(socielUser))
    });
  }

  public loginGoogle(): Observable<SocialUser> {
    return from(this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID))
  }

  public logoutGoogle(): Observable<any> {
    return from(this.socialAuthService.signOut())
  }

  public getReCaptcha(action: string): Observable<string> {
    return this.reCaptchaV3Service.execute(action)
  }

}
