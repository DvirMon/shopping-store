import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import angular modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule } from 'ng-recaptcha'
import { MaterialModule } from './material.module';
  


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports : [
    NgbModule,
    CommonModule,
    RecaptchaModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
  ]
})
export class CoreModule { }
