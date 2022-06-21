import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ProductsService } from 'src/app/feat-modules/products/products.service';
import { CurrentItemModel } from '../cart-list-item/cart-item-model';
import { CartModel } from '../cart-list/cart.model';
import { CartService } from '../cart-list/cart.service';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrls: ['./cart-button.component.scss']
})
export class CartButtonComponent implements OnInit, OnDestroy {

  @Input() public drawerCart: MatSidenav
  @Input() isAdmin: boolean

  public isMobile: Observable<boolean> = this.productsService.isMobile()
  public currentItems: CurrentItemModel[]
  public items: number

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.subscribeToStore()
  }

  ngOnDestroy(): void {
  }

  private subscribeToStore(): void {
    this.cartService.cart$.subscribe(
      (cart: CartModel) => {
        this.items = cart.getItems().length
      }
    )
  }

  public onDrawerCart() {
    this.drawerCart.toggle()
    this.productsService.handleDrawerToggle.next(this.drawerCart.opened)
  }


}
