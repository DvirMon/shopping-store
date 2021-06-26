import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../share-components/shared-components.module';
import { CodeInputModule } from 'angular-code-input';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input'

import { AuthRoutingModule } from './auth-routing.module';

// IMPORT COMPONENTS

import { RootComponent } from './components/root/root.component';
import { AuthBarComponent } from './components/auth-bar/auth-bar.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';

import { ResetComponent } from './components/reset/reset.component';
import { ResetFormComponent } from './components/reset-steper/reset-form.component';
import { ResetMethodComponent } from './components/reset-method/reset-method.component';
import { ResetAuthComponent } from './components/reset-contact/reset-auth.component';
import { ResetConfirmComponent } from './components/reset-confirm/reset-confirm.component';
import { ResetNewPasswordComponent } from './components/reset-new-password/reset-new-password.component';

@NgModule({
  declarations: [
    AuthBarComponent,

    LoginComponent,
    RegisterComponent,

    ResetAuthComponent,
    ResetConfirmComponent,
    ResetNewPasswordComponent,

    AuthDialogComponent,
    ResetComponent,
    RootComponent,
    ResetMethodComponent,
    ResetFormComponent,
  ],
  imports: [
    CoreModule,
    RouterModule,
    AuthRoutingModule,
    SharedModule,
    CodeInputModule.forRoot({
      codeLength: 6,
      isCharsCode: false,
    }),
    NgxMatIntlTelInputModule
  ],
  providers: [],
  exports: []
})
export class AuthModule { }
