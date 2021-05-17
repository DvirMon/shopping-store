import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MatSidenav } from '@angular/material/sidenav';

import { CurrentItemModel } from 'src/app/utilities/models/cart-item-model';

import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';

import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-products-nav',
  templateUrl: './products-nav.component.html',
  styleUrls: ['./products-nav.component.scss']
})
export class ProductsNavComponent  {

  @Input() drawerProduct: MatSidenav
  @Input() drawerCart: MatSidenav
  @Input() drawerSearch: MatSidenav
  @Input() isAdmin: boolean

  public isMobile$: Observable<boolean> = this.productsService.isMobile()
  public currentItems: CurrentItemModel[]

  constructor(
    private productsService: ProductsService,
  ) { }



  // LOGIC SECTION

  public onDrawerProducts() {
    this.drawerProduct.toggle()
  }


}
