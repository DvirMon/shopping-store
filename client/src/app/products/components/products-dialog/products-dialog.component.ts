
import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CartItemModel } from 'src/app/utilities/models/cart-item-model';
import { CartModel } from 'src/app/utilities/models/cart-model';
import { ProductModel } from 'src/app/utilities/models/product-model';

import { FormService } from 'src/app/utilities/services/form.service';
import { CartService, CartActionInfo } from 'src/app/utilities/services/cart.service';
import { DialogData } from 'src/app/utilities/services/dialog.service';

import { store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { MatTooltip } from '@angular/material/tooltip';
import { FormControl, NgModel, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss']
})

export class ProductsDialogComponent implements OnInit, AfterViewInit {

  @ViewChild(MatTooltip) toolTip: MatTooltip;
  @ViewChild('cartItemQuantity') cartItemQuantity: NgModel;

  public quantityControl: FormControl

  public cartItems: CartItemModel[] = []
  public minQuantity: boolean = false
  
  public editMode: boolean = false
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formService: FormService,
    private cartService: CartService,
    public product: ProductModel,
    public cart: CartModel, 
    public cartItem: CartItemModel

  ) { }

  ngOnInit(): void {

    this.product = this.data.payload;
    this.handleStoreSubscribe();
    this.handleUpdateState();

  }

  ngAfterViewInit() {
    this.InvokeQuantityFormControl()
    this.setControlValidators()
    this.controlValueSubscription()
  }


  // form section

  private InvokeQuantityFormControl() {
    this.quantityControl = this.cartItemQuantity.control
  }

  private setControlValidators() {
    this.quantityControl.setValidators([Validators.required, Validators.min(1)])
  }

  public onAddQuantity(): void {
    this.cartItem.quantity++
    this.minQuantity = false
  }

  public onRemoveQuantity(): void {
    if (this.cartItem.quantity === 1) {
      this.minQuantity = true
      this.toolTip.show()
      return
    }
    this.cartItem.quantity--
  }

  // end of form section

  // subscription section

  private handleStoreSubscribe(): void {
    store.subscribe(
      () => {
        this.cartItems = store.getState().cart.cartItems;
        this.cart = store.getState().cart.cart;
      }
    )
    this.cartItems = store.getState().cart.cartItems;
    this.cartItem.totalPrice = this.product.price
    this.cart = store.getState().cart.cart;
  }

  private controlValueSubscription() {
    this.quantityControl.valueChanges.pipe(
    map(quantity => {
        if (this.quantityControl.errors) {
          this.quantityControl.setValue(1)
          quantity = 1
        }
        this.cartItem.totalPrice = quantity * this.product.price
      })
    ).subscribe()
  }

  // end of subscribe section

  // request section

  public handleRequest(): void {
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

  public handleRequestSuccess(response: CartActionInfo) {
    this.formService.handleStore(ActionType.SetCartPrice, response.cartTotalPrice)
    this.cartItem = response.cartItem

  }

  // end of request section

  // logic section

  // set update state if item already exist in the cart
  private handleUpdateState(): void {

    const cartItem = this.isCartItemInCart();
    if (cartItem) {
      this.cartItem = cartItem;
      this.editMode = true;
    }
    else {
      this.cartItemDefaultValues();
    }

  }

  // find if item is already exist in the cart
  private isCartItemInCart(): CartItemModel {
    return this.cartItems.find(cartItem => {
      if (cartItem.productId === this.product._id) {
        return cartItem
      }
    })
  }

  // default values for cart item
  private cartItemDefaultValues(): void {
    this.cartItem.cartId = this.cart._id
    this.cartItem.productId = this.product._id
    this.cartItem.quantity = 1
  }

}
