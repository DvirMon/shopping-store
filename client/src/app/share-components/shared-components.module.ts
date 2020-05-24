import { NgModule, ErrorHandler } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';

// import for global providers
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../utilities/interceptors/auth-interceptor.service';
import { DialogInterceptorService } from '../utilities/interceptors/dialog-interceptor.service';
import { ErrorsService } from '../utilities/services/errors.service';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// shared components 
import { MyInputComponent } from './components/my-input/my-input.component';
import { UploadInputComponent } from './components/upload-input/upload-input.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { SearchComponent } from './components/search/search.component';
import { SearchListItemComponent } from './components/search-list-item/search-list-item.component';
import { ProductThumbnailComponent } from './components/product-thumbnail/product-thumbnail.component';


import { HighLightPipe } from '../utilities/pipes/high-light.pipe';
 

@NgModule({
  declarations: [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent,
    SearchComponent,
    SearchListItemComponent,
    ProductThumbnailComponent,
    HighLightPipe,
    
  ],
  imports: [
    CoreModule,
  ],
  exports: [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent,
    SearchComponent,
    SearchListItemComponent,
    ProductThumbnailComponent,
    HighLightPipe,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DialogInterceptorService,
      multi: true
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {} },
    { provide: MatDialogRef, useValue: DialogComponent },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
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
