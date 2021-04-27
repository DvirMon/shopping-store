import { Component, OnInit, Input } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';

import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { UserModel } from 'src/app/utilities/models/user-model';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { CartModel } from 'src/app/utilities/models/cart-model';
import { CartItemModel } from 'src/app/utilities/models/cart-item-model';

import { CartService } from 'src/app/services/cart.service';
import { ReceiptService } from 'src/app/services/receipt.service';

import { store } from 'src/app/utilities/redux/store';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  @Input() public orderMode: boolean = false;
  @Input() drawer: MatSidenav;


  public cartItem: CartItemModel = new CartItemModel()
  public searchControl = new FormControl();
  public cartItems: CartItemModel[] = [];
  public cartTotalPrice: number;

  constructor(
    private router: Router,
    private receiptService: ReceiptService,
    private cartService: CartService,
    public product: ProductModel,
    public cart: CartModel,
    private user: UserModel


  ) { }

  ngOnInit(): void {
    this.subscribeToStore();
  }

  // subscribe section

  private subscribeToStore(): void {
    store.subscribe(
      () => {
        this.cartItems = [...store.getState().cart.cartItems];
        this.cart = store.getState().cart.cart;
        this.cartTotalPrice = store.getState().cart.cartTotalPrice;
        this.user = store.getState().auth.user;
      }
    )
    this.cartItems = store.getState().cart.cartItems;
    this.cart = store.getState().cart.cart;
    this.cartTotalPrice = store.getState().cart.cartTotalPrice;
    this.user = store.getState().auth.user;
  }

  // end of subscribe section

  // request section

  public deleteAllCartItems(): void {
    const answer = confirm("Delete Cart?")
    if (!answer) {
      return
    }
    this.cartService.deleteCartAndCartItems(this.cart._id)
  }
  // end of request section


  // logic section

  // navigate to order
  public goToOrder(): Promise<boolean> {

    if (this.cartItems.length === 0) {
      alert("your cart is empty")
      return
    }

    return this.router.navigateByUrl(`/order/${this.user._id}/${this.cart._id}`)
  }

  // navigate back to store
  public backToSore(): void {
    this.receiptService.resetReceiptState()
    this.router.navigateByUrl(environment.productLandingPage)
  }

  // end of logic section
}
