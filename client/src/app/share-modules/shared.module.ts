import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';

import { MyInputComponent } from './my-input/my-input.component';
import { UploadInputComponent } from './upload-input/upload-input.component';
import { DialogComponent } from './dialog/dialog.component';
import { TextareaComponent } from './textarea/textarea.component';


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
  exports : [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent,
    TextareaComponent
  ]
})
export class SharedModule { }
