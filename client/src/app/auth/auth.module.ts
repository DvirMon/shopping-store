import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../share-components/shared-components.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { RegisterAuthComponent } from './components/register-auth/register-auth.component';
import { RegisterPersonalComponent } from './components/register-personal/register-personal.component';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component'

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { environment } from '../../environments/environment'


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthDialogComponent,
    RegisterAuthComponent,
    RegisterPersonalComponent,
    GoogleSignInComponent,

  ],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        // autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientId
            ),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthModule { }
