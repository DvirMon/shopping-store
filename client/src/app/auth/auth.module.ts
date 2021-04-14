import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../share-components/shared-components.module';

// IMPORT COMPONENTS
import { AuthDashboardComponent } from './components/auth-dashboard/auth-dashboard.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { RegisterAuthComponent } from './components/register-auth/register-auth.component';
import { RegisterPersonalComponent } from './components/register-personal/register-personal.component';

import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component'

import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
 
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [

    LoginComponent,
    RegisterComponent,

    RegisterAuthComponent,
    RegisterPersonalComponent,

    AuthDialogComponent,
    GoogleSignInComponent,
    AuthDashboardComponent,


  ],
  imports: [
    CoreModule,
    RouterModule,
    AuthRoutingModule,
    SharedModule,
  ],
  providers: [],
  exports: []
})
export class AuthModule { }
