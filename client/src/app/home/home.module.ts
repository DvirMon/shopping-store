import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../share-modules/shared.module';
import { InfoComponent } from './info/info.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    InfoComponent,
    AboutComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    RouterModule
  ],
  exports : [
    InfoComponent,
    AboutComponent
  ]
})
export class HomeModule { }
