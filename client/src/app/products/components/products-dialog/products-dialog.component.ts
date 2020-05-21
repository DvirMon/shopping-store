
import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CartItemModel } from 'src/app/models/cart-item-model';
import { CartModel } from 'src/app/models/cart-model';
import { ProductModel } from 'src/app/models/product-model';
import { DialogData } from 'src/app/models/dialog-model';

import { FormService } from 'src/app/services/form.service';
import { CartService, CartActionInfo } from 'src/app/services/cart.service';

import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss']
})

export class ProductsDialogComponent implements OnInit {

  public cart: CartModel = new CartModel()
  public cartItems: CartItemModel[] = []
  public cartItem: CartItemModel = new CartItemModel()
  
  public editMode: boolean = false
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formService: FormService,
    private cartService: CartService,
    public product: ProductModel

  ) { }

  ngOnInit(): void {

    this.product = this.data.product;
    this.handleStoreSubscribe();
    this.handleUpdate();
  }

  // subscribe section

  private handleStoreSubscribe(): void {
    store.subscribe(
      () => {
        this.cartItems = store.getState().cart.cartItems;
        this.cart = store.getState().cart.cart;
      }
    )
    this.cartItems = store.getState().cart.cartItems;
    this.cart = store.getState().cart.cart;
  }

  // end of subscribe section

  // request section

  public handleRequest() {

    this.cartItem.totalPrice = this.getCartItemPrice()

    if (this.cartItems.length === 0) {
      this.cartService.getNewCart(this.cartItem).subscribe(
        (response: CartActionInfo) => {
          this.formService.handleStore(ActionType.AddCartItem, response.cartItem)
          this.handleRequestSuccess(response)
          this.editMode = true
        }
        )
        return
      }
      this.editMode
      ? this.updateCartItem()
      : this.AddCartItem()
      
    }
    
    public AddCartItem(): void {
      this.cartService.addCartItem(this.cartItem).subscribe(
        (response: CartActionInfo) => {
          this.formService.handleStore(ActionType.AddCartItem, response.cartItem)
          this.formService.handleStore(ActionType.IsCartActive, true)
          this.handleRequestSuccess(response)
          this.editMode = true
      }
      )
  }

  public updateCartItem(): void {
    this.cartService.updateCartItem(this.cartItem).subscribe(
      (response: CartActionInfo) => {
        this.formService.handleStore(ActionType.UpdatedItemCart, response.cartItem)
        this.handleRequestSuccess(response)
      }
      )
    }
    
    public handleRequestSuccess(response : CartActionInfo) {
      this.formService.handleStore(ActionType.SetCartPrice, response.cartTotalPrice)
      this.cartItem = response.cartItem
    
  }

  // end of request section

  // logic section

  private handleUpdate(): void {

    const cartItem = this.isCartItemInCart();
    if (cartItem) {
      this.cartItem = cartItem;
      this.editMode = true;
    }
    else {
      this.invokeCartItem();
    }

  }

  private isCartItemInCart(): CartItemModel {
    return this.cartItems.find(cartItem => {
      if (cartItem.productId === this.product._id) {
        return cartItem
      }
    })
  }

  private invokeCartItem(): void {
    this.cartItem.cartId = this.cart._id
    this.cartItem.productId = this.product._id
    this.cartItem.quantity = 1
  }


  public onAddQuantity(): void {
    this.cartItem.quantity++
  }

  public onRemoveQuantity(): void {
    if (this.cartItem.quantity === 1) {
      return
    }
    this.cartItem.quantity--

  }

  public getCartItemPrice(): number {
    return this.cartItem.quantity * this.product.price
  }


}
