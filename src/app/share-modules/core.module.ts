// import angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule } from 'ng-recaptcha';
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PaginationModel } from '../utilities/models/pagination-model';
import { CartItemModel, CurrentItemModel } from '../feat-modules/cart/components/cart-list-item/cart-item-model';
import { CartModel } from '../feat-modules/cart/components/cart-list/cart.model';
import { OrderModel } from '../feat-modules/order/components/order-form/order-model';
import { ProductModel } from '../feat-modules/products/product-model';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
    GooglePlaceModule,
    FlexLayoutModule,
  ],
  providers: [
    {
      provide: ProductModel,
      useValue: new ProductModel(),
    },
    {
      provide: CartModel,
      useValue: new CartModel(),
    },
    {
      provide: CartItemModel,
      useValue: new CartItemModel(),
    },
    {
      provide: CurrentItemModel,
      useValue: new CurrentItemModel(),
    },
    {
      provide: OrderModel,
      useValue: new OrderModel(),
    },
    {
      provide: PaginationModel,
      useValue: new PaginationModel(),
    },
  ],
  exports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RecaptchaModule,
    MaterialModule,
    FontAwesomeModule,
    GooglePlaceModule,
    FlexLayoutModule
  ],
})
export class CoreModule {}
