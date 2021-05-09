import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';

import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { UserModel } from 'src/app/utilities/models/user-model';
import { CartModel } from 'src/app/utilities/models/cart-model';
import { CartItemModel } from 'src/app/utilities/models/cart-item-model';

import { CartService } from 'src/app/services/cart.service';
import { ReceiptService } from 'src/app/services/receipt.service';

import { store } from 'src/app/utilities/redux/store';

import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  // changeDetection : ChangeDetectionStrategy.OnPush
})
export class CartListComponent implements OnInit, OnDestroy {

  @Input() public drawer: MatSidenav;
  @Input() public orderMode: boolean = false;

  public searchControl = new FormControl();
  public cartTotalPrice: number;

  public cart: CartModel = new CartModel();
  private user: UserModel = new UserModel();
  private unsubscribeToStore: Function;

  constructor(
    private router: Router,
    private receiptService: ReceiptService,
    private cartService: CartService,



  ) { }

  ngOnInit(): void {
    this.subscribeToStore();
  }

  ngOnDestroy(): void {
    this.unsubscribeToStore()
  }

  // SUBSCRIBE SECTION

  private subscribeToStore(): void {
    this.unsubscribeToStore = store.subscribe(
      () => {
        this.cart = store.getState().cart.cart;
        this.user = store.getState().auth.user;
        this.cartTotalPrice = this.cart.getTotalPrice()
      }
    )
    this.cart = store.getState().cart.cart;
    this.user = store.getState().auth.user;
    this.cartTotalPrice = this.cart.getTotalPrice()

  }


  // end of subscribe section

  // HTTP SECTION

  public deleteAllCartItems(): void {

    if (this.cart.getItems().length === 0) {
      return
    }

    const answer = confirm("Delete Cart?")

    if (!answer) {
      return
    }
    this.cartService.deleteCartAndCartItems(this.cart.get_id())
  }


  // LOGIC SECTION

  // calcaulate total cart price

  private getTotelProce() {
  }

  // navigate to order
  public goToOrder(): Promise<boolean> {

    if (this.cart.getItems().length === 0) {
      alert("your cart is empty")
      return
    }

    return this.router.navigateByUrl(`/home/order/${this.user._id}/${this.cart.get_id()}`)
  }

  // navigate back to store
  public backToSore(): void {
    this.receiptService.resetReceiptState()
    this.router.navigateByUrl(environment.productLandingPage)
  }

  // end of logic section
}
