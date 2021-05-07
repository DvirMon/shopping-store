import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MatSidenav } from '@angular/material/sidenav';

import { CartItemModel } from 'src/app/utilities/models/cart-item-model';

import { ProductsService } from 'src/app/services/products.service';
import { AuthService } from 'src/app/services/auth.service';

import { store } from 'src/app/utilities/redux/store';

@Component({
  selector: 'app-products-nav',
  templateUrl: './products-nav.component.html',
  styleUrls: ['./products-nav.component.scss']
})
export class ProductsNavComponent implements OnInit, OnDestroy {

  @Input() drawerCart: MatSidenav
  @Input() drawerProduct: MatSidenav
  @Input() isAdmin: boolean

  public isMobile: Observable<boolean> = this.productsService.isMobile()
  public cartItems: CartItemModel[]

  private unsubscribeToStore: Function;


  constructor(
    private productsService: ProductsService,
    private authService: AuthService

  ) { }

  ngOnInit(): void {
    this.subscribeToStore()
  }

  ngOnDestroy(): void {
    this.unsubscribeToStore()
  }

  // SUBSCRIBE SECTION

  private subscribeToStore(): void {
    this.unsubscribeToStore = store.subscribe(
      () => {
        this.cartItems = [...store.getState().cart.cart.getItems()];
      }
    )
    this.cartItems = [...store.getState().cart.cart.getItems()];
  }


  // LOGIC SECTION
  public onDrawerCart() {
    this.drawerCart.toggle()
    this.productsService.handleDrawerToggle.next(this.drawerCart.opened)
  }

  public onDrawerProducts() {
    this.drawerProduct.toggle()
  }

  public logout() {
    this.authService.logout()
  }

}
