import { NgModule } from '@angular/core';
import { CoreModule } from './core.module';

import { MyInputComponent } from '../custom-components/my-input/my-input.component';
import { UploadInputComponent } from '../custom-components/upload-input/upload-input.component';
import { DialogComponent } from '../custom-components/dialog/dialog.component';


@NgModule({
  declarations: [
    // MyInputComponent,
    // UploadInputComponent,
    // DialogComponent
  ],
  imports: [
    CoreModule,
  ],
  exports : [
    // MyInputComponent,
    // UploadInputComponent,
    // DialogComponent
  ]
})
export class ShareModule { }
