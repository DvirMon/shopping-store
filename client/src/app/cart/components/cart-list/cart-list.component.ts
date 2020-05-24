import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { CartModel } from 'src/app/utilities/models/cart-model';
import { CartItemModel } from 'src/app/utilities/models/cart-item-model';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';
import { CartService } from 'src/app/utilities/services/cart.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  @Input() public orderMode: boolean = false

  public product: ProductModel = new ProductModel()
  public cartItems: CartItemModel[] = []
  public cartItem: CartItemModel = new CartItemModel()
  public cart: CartModel = new CartModel()
  public cartTotalPrice: number

  public searchControl = new FormControl();

  constructor(
    private router: Router,
    private cartService: CartService

  ) { }

  ngOnInit(): void {

    this.handleStoreSubscribe()
  }

  // subscribe section

  private handleStoreSubscribe(): void {
    store.subscribe(
      () => {
        this.cartItems = store.getState().cart.cartItems;
        this.cart = store.getState().cart.cart;
        this.cartTotalPrice = store.getState().cart.cartTotalPrice;
      }
    )
    this.cartItems = store.getState().cart.cartItems;
    this.cart = store.getState().cart.cart;
    this.cartTotalPrice = store.getState().cart.cartTotalPrice;
  }

  // end of subscribe section

  // logic section

  public goToOrder() {
    this.router.navigateByUrl(`/order/${this.cart._id}`)
  }

  public deleteAllCartItems() {
    const answer = confirm("Delete Cart?")
    if (!answer) {
      return
    }
    this.cartService.deleteCartAndCartItems(this.cart._id)
  }

  public backToSore() {
    this.router.navigateByUrl(`/products/5e91e29b9c08fc560ce2cf32`)
  }

}
