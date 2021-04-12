import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../share-components/shared-components.module';

// GOOGLE SIGN IN MODULES
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

// IMPORT COMPONENTS
import { LoginComponent } from './components/login/login.component';
import { LoginFormComponent } from './components/login -form/login-form.component';

import { RegisterComponent } from './components/register/register.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { RegisterAuthComponent } from './components/register-auth/register-auth.component';
import { RegisterPersonalComponent } from './components/register-personal/register-personal.component';

import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component'

import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';

import { environment } from '../../environments/environment';


@NgModule({
  declarations: [

    LoginComponent,
    LoginFormComponent,

    RegisterComponent,
    RegisterFormComponent,
    RegisterAuthComponent,
    RegisterPersonalComponent,

    AuthDialogComponent,
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
