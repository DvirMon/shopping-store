import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDialog, DialogData } from 'src/app/models/dialog-model';
import { CartService } from 'src/app/services/cart.service';
import { store } from 'src/app/redux/store';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { CartModel } from 'src/app/models/cart-model';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss']
})
export class ProductsDialogComponent implements OnInit {


  public cart : CartModel = new CartModel()
  public cartItems: CartItemModel[] = []
  public cartItem: CartItemModel = new CartItemModel(
    this.data.product._id
  )

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private cartService: CartService,

  ) { }

  ngOnInit(): void {

    store.subscribe(
      () => {
        this.cartItems = store.getState().cart.cartItems
        this.cart = store.getState().cart.cart
      }
      )
      this.cartItems = store.getState().cart.cartItems
      this.cart = store.getState().cart.cart
  }

  public AddToCart() {

    this.cartItem.totalPrice = this.data.product.price

    console.log(this.cartItems.length)
    if (this.cartItems.length === 0) {
      this.cartService.getNewCart(this.cartItem)
      return
    }

    this.cartItem.cartId = this.cart._id
    console.log(this.cartItem)

    this.cartService.addCartItem(this.cartItem)
  }

}
