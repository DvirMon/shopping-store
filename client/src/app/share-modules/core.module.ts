import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import angular modules
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecaptchaModule } from 'ng-recaptcha'
import { MaterialModule } from './material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { AgmCoreModule} from '@agm/core'


import { OrderModel } from '../utilities/models/order-model';
import { ProductModel } from '../utilities/models/product-model';
import { CartModel } from '../utilities/models/cart-model';
import { UserModel } from '../utilities/models/user-model';
import { CartItemModel } from '../utilities/models/cart-item-model';
import { PaginationModel } from '../utilities/models/pagination-model';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AgmCoreModule.forRoot({
      apiKey : "AIzaSyDILBPfSAiKKypPQU-hO92beFbyaQGE0uw"
    }),
    GooglePlaceModule
  ],
   providers: [
    {
      provide: UserModel,
      useValue: new UserModel()
    },
    {
      provide: OrderModel,
      useValue: new OrderModel()
    },
    {
      provide: CartModel,
      useValue: new CartModel()
    },
    {
      provide: CartItemModel,
      useValue: new CartItemModel()
    },
    {
      provide: ProductModel,
      useValue: new ProductModel()
    },
    {
      provide: PaginationModel,
      useValue: new PaginationModel()
    }


  ],
  exports: [
    CommonModule,
    NgbModule,
    RecaptchaModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    FontAwesomeModule,
    AgmCoreModule,
    GooglePlaceModule

  ]
})
export class CoreModule { }
