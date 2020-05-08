import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';

import { MyInputComponent } from './my-input/my-input.component';
import { UploadInputComponent } from './upload-input/upload-input.component';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent
  ],
  imports: [
    CoreModule,
  ],
  exports : [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent
  ]
})
export class SharedModule { }
