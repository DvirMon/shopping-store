import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../share-modules/core.module';
import { MaterialModule } from '../share-modules/material.module';

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
    CommonModule,
    CoreModule,
    MaterialModule
  ],
  exports : [
    MyInputComponent,
    UploadInputComponent,
    DialogComponent
  ]
})
export class CustomComponentsModule { }
