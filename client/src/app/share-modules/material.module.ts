import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import {MatMenuModule} from '@angular/material/menu';

import {MatSelectModule} from '@angular/material/select';
 
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatStepperModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSelectModule
  ]
})
export class MaterialModule { }
