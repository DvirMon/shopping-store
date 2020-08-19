import { NgModule, ErrorHandler } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';

// GLOBAL PROVIDES
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA } from '@angular/material/dialog';

// SERVICES
import { AuthInterceptorService } from '../utilities/interceptors/auth-interceptor.service';
import { SpinnerInterceptorService } from '../utilities/interceptors/spinner-interceptor.service';
import { ErrorsService } from '../utilities/interceptors/errors.service';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';

// SHRED COMPONENTS 
import { MyInputComponent } from './components/my-input/my-input.component';
import { UploadInputComponent } from './components/upload-input/upload-input.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SearchComponent } from './components/search/search.component';
import { SearchListItemComponent } from './components/search-list-item/search-list-item.component';
import { ProductThumbnailComponent } from './components/product-thumbnail/product-thumbnail.component';
import { AddressComponent } from './components/address/address.component';

import { HighLightPipe } from '../utilities/pipes/high-light.pipe';
import { BarBackgroundColorDirective } from '../utilities/directives/bar-background-color.directive';
import { SidenavAdminDirective } from '../utilities/directives/sidnav-admin.directive';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { environment } from 'src/environments/environment'


@NgModule({
  declarations: [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent,
    SearchComponent,
    SearchListItemComponent,
    ProductThumbnailComponent,
    AddressComponent,
    HighLightPipe,
    BarBackgroundColorDirective,
    SidenavAdminDirective,
    
  ],
  imports: [
    CoreModule,
    RecaptchaV3Module

  ],
  exports: [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent,
    SearchComponent,
    SearchListItemComponent,
    ProductThumbnailComponent,
    AddressComponent,
    HighLightPipe,
    BarBackgroundColorDirective,
    SidenavAdminDirective,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptorService,
      multi: true
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {} },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false, showError: true }
    },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.reCaptchaSiteKey },

    {
      provide: ErrorHandler,
      useClass: ErrorsService
    },
  ],
  entryComponents: [
    DialogComponent,
  ]

})
export class SharedModule { }
