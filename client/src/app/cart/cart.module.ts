import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../share-components/shared-components.module';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartListItemComponent } from './components/cart-list-item/cart-list-item.component';



@NgModule({
  declarations: [
    CartListComponent,
    CartListItemComponent,
  ],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    CartListComponent,
    CartListItemComponent
  ]
})
export class CartModule { }
