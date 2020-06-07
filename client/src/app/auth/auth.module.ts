import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../share-components/shared-components.module';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { ReCaptchaComponent} from './components/re-captcha/re-captcha.component'


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthDialogComponent,
    ReCaptchaComponent, 

  ],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthModule { }
