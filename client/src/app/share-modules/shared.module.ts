import { NgModule, ErrorHandler } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';

import { MyInputComponent } from './my-input/my-input.component';
import { UploadInputComponent } from './upload-input/upload-input.component';
import { DialogComponent } from './dialog/dialog.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ErrorsService } from '../services/errors.service';


@NgModule({
  declarations: [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent,
    TextareaComponent
  ],
  imports: [
    CoreModule,
  ],
  exports: [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent,
    TextareaComponent
  ], providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsService
    },
  ]
})
export class SharedModule { }
