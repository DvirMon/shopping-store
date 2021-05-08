import { NgModule } from '@angular/core';
import { CoreModule } from '../share-modules/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../share-components/shared-components.module';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { CartListItemComponent } from './components/cart-list-item/cart-list-item.component';
import { CartButtonComponent } from './components/cart-button/cart-button.component';



@NgModule({
  declarations: [
    CartListComponent,
    CartListItemComponent,
    CartButtonComponent,
  ],
  imports: [
    CoreModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    CartListComponent,
    CartListItemComponent,
    CartButtonComponent
  ]
})
export class CartModule { }
