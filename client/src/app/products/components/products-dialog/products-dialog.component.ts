
import { Component, OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';

import { FormControl, NgModel, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';

import { CartItemModel } from 'src/app/utilities/models/cart-item-model';
import { CartModel } from 'src/app/utilities/models/cart-model';
import { ProductModel } from 'src/app/utilities/models/product-model';

import { FormService } from 'src/app/services/form.service';
import { CartService } from 'src/app/services/cart.service';
import { DialogData } from 'src/app/services/dialog.service';

import { map } from 'rxjs/operators';

import { ActionType } from 'src/app/utilities/redux/action-type';
import { store } from 'src/app/utilities/redux/store';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss']
})



export class ProductsDialogComponent implements OnInit, AfterViewInit {

  @ViewChild(MatTooltip) toolTip: MatTooltip;
  @ViewChild('cartItemQuantity') cartItemQuantity: NgModel;

  private distinctChange: boolean = false
  private editMode: boolean = false

  public quantityControl: FormControl
  public editState$: Observable<boolean> = this.cartService.getEditState()
  public minQuantity: boolean = false
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

    public cartItem: CartItemModel,
    public cart: CartModel,
    public product: ProductModel,

  ) { }

  ngOnInit(): void {

    this.setDilaogProps()
    this.subscribeToStore();
    this.subscribeToBreakPoints()
    this.subscribtToEditMode()
    this.subscribeToCartItem()
    this.handleCartItemData();
  }

  ngAfterViewInit() {
    this.InvokeQuantityFormControl()
    this.setControlValidators()
    this.subscribeToControls()
  }


  // FORM SECTION

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



  // SUBSCRIBTION SECTION

  // method to subscribt to store data
  private subscribeToStore(): void {
    store.subscribe(
      () => {
        this.cart = store.getState().cart.cart;
      }
    )
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

  private subscribtToEditMode() {
    this.editState$.subscribe(
      (editMode: boolean) => {
        this.editMode = editMode;
      }
    )
  }

  private subscribeToCartItem() {
    this.cartService.getCartItemSubject().subscribe(
      (cartItem: CartItemModel) => {
        this.cartItem = cartItem
      }
    )
  }

  private subcribeToRoureData() {

}

  // end of subscribe section

  // HTTP SECTION

  public handleRequest(): void {

  if(this.cart.getItems().length === 0) {
  return this.crateCart()
}

if (!this.editMode) {
  return this.AddCartItem()
}

if (this.distinctChange) {
  return this.updateCartItem()
}

  }

  private crateCart(): void {
  this.cartService.createCart(this.cartItem).subscribe(
    (cartItem: CartItemModel) => {
      this.handleRequestSuccess(cartItem)
    }
  )
}

  private AddCartItem(): void {
  console.log(this.cartItem)
    this.cartService.addCartItem(this.cartItem).subscribe(
    (cartItem: CartItemModel) => {
      console.log(cartItem)
      this.handleRequestSuccess(cartItem)
    }
  )
}

  private updateCartItem(): void {
  this.cartService.updateCartItem(this.cartItem).subscribe(
    (cartItem: CartItemModel) => {
      console.log(cartItem)
      this.handleRequestSuccess(cartItem)
      this.distinctChange = false
    }
  )
}

  // TODO - calculate cart total price

  // main method to handle cart item actions
  private handleRequestSuccess(cartItem: CartItemModel): void {

  if(this.editMode) {
  this.formService.handleStore(ActionType.UpdateCartItem, cartItem)
} else {
  this.formService.handleStore(ActionType.AddCartItem, cartItem)
  this.formService.handleStore(ActionType.AddCartProduct, this.product)
  this.cartService.emitEditState(true);
}
this.cartService.emitCartItem(cartItem)

  }

  // end of request section

  // LOGIC SECTION

  // set cart item values
  private handleCartItemData(): void {

  this.cart.getItems().length > 0
    ? this.cartItemUpdateValue()
    : this.cartItemDefaultValues();

}

  // method to update exist cart item values
  private cartItemUpdateValue() {
  const cartItem = this.cart.findCartItem(this.product._id);
  if (cartItem) {
    this.cartService.emitCartItem(cartItem)
    this.cartService.emitEditState(true);
  } else {
    this.cartItemDefaultValues()
  }
}

  // default values for cart item
  private cartItemDefaultValues(): void {
  console.log(this.cart.get_id())
    this.cartItem.cartId = this.cart.get_id();
  this.cartItem.productId = this.product._id;
  this.cartItem.quantity = 1;
}

  private setDilaogProps(): void {
  this.product = this.data.payload.product;
  this.alias = this.data.payload.alias;
}

}
