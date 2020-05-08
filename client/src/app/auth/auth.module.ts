import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../share-modules/material.module';
import { CustomComponentsModule } from '../custom-components/custom-components.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
   
  ],
  imports: [
    CommonModule,
    CoreModule,
    RouterModule,
    MaterialModule,
    CustomComponentsModule
  ],
  exports :[
    LoginComponent,
    RegisterComponent,
  ]
})
export class AuthModule { }
