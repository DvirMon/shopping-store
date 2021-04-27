
import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';

import { FormControl, NgModel, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';

import { CartItemModel } from 'src/app/utilities/models/cart-item-model';
import { CartModel } from 'src/app/utilities/models/cart-model';
import { ProductModel } from 'src/app/utilities/models/product-model';

import { FormService } from 'src/app/services/form.service';
import { CartService, CartActionInfo } from 'src/app/services/cart.service';
import { DialogData } from 'src/app/services/dialog.service';

import { map } from 'rxjs/operators';

import { ActionType } from 'src/app/utilities/redux/action-type';
import { store } from 'src/app/utilities/redux/store';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss']
})



export class ProductsDialogComponent implements OnInit, AfterViewInit {

  @ViewChild(MatTooltip) toolTip: MatTooltip;
  @ViewChild('cartItemQuantity') cartItemQuantity: NgModel;

  public quantityControl: FormControl

  public cartItem: CartItemModel = new CartItemModel()
  public cartItems: CartItemModel[] = []
  public minQuantity: boolean = false
  public editMode: boolean = false
  public distinctChange: boolean = false
  public alias: string


  public params = {
    cols: 2,
    height: 350,
    width: 350
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private breakpointObserver: BreakpointObserver,
    private formService: FormService,
    private cartService: CartService,
    public product: ProductModel,
    public cart: CartModel,

  ) { }

  ngOnInit(): void {

    this.product = this.data.payload.product;
    this.alias = this.data.payload.alias;
    this.subscribeToStore();
    this.subscribeToBreakPoints()
    this.handleUpdateState();

  }

  ngAfterViewInit() {
    this.InvokeQuantityFormControl()
    this.setControlValidators()
    this.subscribeToControls()
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
    if (this.editMode) {
      this.distinctChange = true
    }
  }

  public onRemoveQuantity(): void {
    if (this.cartItem.quantity === 1) {
      this.minQuantity = true
      this.toolTip.show()
      return
    }
    this.cartItem.quantity--
    if (this.editMode) {
      this.distinctChange = true
    }
  }

  // end of form section

  // subscription section

  private subscribeToStore(): void {
    store.subscribe(
      () => {
        this.cartItems = [...store.getState().cart.cartItems];
        this.cart = store.getState().cart.cart;
      }
    )
    this.cartItems = store.getState().cart.cartItems;
    this.cartItem.totalPrice = this.product.price
    this.cart = store.getState().cart.cart;
  }

  private subscribeToControls() {
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

  private subscribeToBreakPoints() {
    const small: boolean = this.breakpointObserver.isMatched('(max-width: 660px)')
    if (small) {
      this.params.cols = 1
      this.params.height = 250
      this.params.width = 250
    }
  }

  // end of subscribe section

  // request section

  public handleRequest(): void {
    if (this.cartItems.length === 0) {
      this.cartService.getNewCart(this.cartItem).subscribe(
        (response: CartActionInfo) => {
          this.formService.handleStore(ActionType.AddCartItem, response.cartItem)
          this.formService.handleStore(ActionType.AddCartProduct, this.product)
          this.handleRequestSuccess(response)
          this.editMode = true
        }
      )
      return
    }

    if (!this.editMode) {
      this.AddCartItem()
    }
    else if (this.distinctChange) {
      this.updateCartItem()
    }

  }

  public AddCartItem(): void {
    this.cartService.addCartItem(this.cartItem).subscribe(
      (response: CartActionInfo) => {
        this.formService.handleStore(ActionType.AddCartItem, response.cartItem)
        this.formService.handleStore(ActionType.AddCartProduct, this.product)
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
        this.cartService.cartItemQuantity.next(response.cartItem)
        this.handleRequestSuccess(response)
        this.distinctChange = false
      }
    )
  }

  private handleRequestSuccess(response: CartActionInfo): void {
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
