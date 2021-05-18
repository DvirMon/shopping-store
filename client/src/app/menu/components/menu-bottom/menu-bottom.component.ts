import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

import { CartModel } from 'src/app/utilities/models/cart-model';
import { PathModel } from '../menu-top/menu-top.component';

@Component({
  selector: 'app-menu-bottom',
  templateUrl: './menu-bottom.component.html',
  styleUrls: ['./menu-bottom.component.scss']
})
export class MenuBottomComponent implements OnInit {

  public cart$ = this.cartService.cart$ 

  public routes: PathModel[] = [
    { path: "/home", icon: "home" },
    { path: "account", icon: "account_circle" },
    { path: "cart", icon: "shopping_cart" },
    { path: "order/history", icon: "local_shipping" },
  ]

  public items: number

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.subscribeToStore()
  }

  private subscribeToStore(): void {
    this.cartService.cart$.subscribe(
      (cart: CartModel) => {
        this.items = cart.getItems().length
      }
    )
  }
}
