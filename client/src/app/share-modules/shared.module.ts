import { NgModule, ErrorHandler } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';

import { MyInputComponent } from './my-input/my-input.component';
import { UploadInputComponent } from './upload-input/upload-input.component';
import { DialogComponent } from './dialog/dialog.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ErrorsService } from '../services/errors.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../interceptors/auth-interceptor.service';
import { DialogInterceptorService } from '../interceptors/dialog-interceptor.service';
import { SelectComponent } from './select/select.component';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


const dialogMock = {
  close: () => { }
};

@NgModule({
  declarations: [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent,
    TextareaComponent,
    SelectComponent,
  ],
  imports: [
    CoreModule,
  ],
  exports: [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent,
    TextareaComponent,
    SelectComponent,
  ], providers: [
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
    { provide: MAT_DIALOG_DATA, useValue: [] },
    { provide: ErrorHandler, useClass: ErrorsService },
  ],
  entryComponents: [
    DialogComponent,
  ]

})
export class SharedModule { }
