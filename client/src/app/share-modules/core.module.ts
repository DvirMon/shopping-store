import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import angular modules
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule } from 'ng-recaptcha'
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [

  ],
  exports: [
    CommonModule,
    NgbModule,
    RecaptchaModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,

  ]
})
export class CoreModule { }
