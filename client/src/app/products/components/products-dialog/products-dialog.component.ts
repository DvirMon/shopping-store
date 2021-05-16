
import { Component, OnInit, Inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { FormControl, NgModel, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';

import { CartItemModel, CurrentItemModel } from 'src/app/utilities/models/cart-item-model';
import { CartModel } from 'src/app/utilities/models/cart-model';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { DialogData } from 'src/app/services/dialog.service';

import { CartItemService } from 'src/app/services/cart-item.service';
import { FormService } from 'src/app/services/form.service';
import { CartService } from 'src/app/services/cart.service';

import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { store } from 'src/app/utilities/redux/store';

export interface imageParams {
  cols: number,
  height: number,
  width: number
}

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss']
})

export class ProductsDialogComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MatTooltip) toolTip: MatTooltip;
  @ViewChild('cartItemQuantity') cartItemQuantity: NgModel;

  private isLogin: boolean = store.getState().auth.isLogin

  private distinctChange: boolean = false
  private editState: boolean = false

  private unsubscribeCartItem: Subscription
  private unsubscribeToEdit: Subscription
  private unsubscribeToMobile: Subscription

  public quantityControl: FormControl

  public isMobile$: Observable<boolean> = this.formService.isMobile$
  public editState$: Observable<boolean> = this.cartService.getEditState()

  public minQuantity: boolean = false
  public alias: string
  public params: imageParams


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,

    private formService: FormService,
    private cartService: CartService,
    private cartItemService: CartItemService,

    public product: ProductModel,
    public cart: CartModel,
    public cartItem: CartItemModel,
    public currentItem: CurrentItemModel
  ) { }

  ngOnInit(): void {

    this.setDilaogProps()
    this.subscribeToStore();
    this.subscribeToMobile()
    this.subscribtToEditMode()
    this.subscribeToCartItem()
    this.handleCartItemData();
  }

  ngAfterViewInit() {
    this.InvokeQuantityFormControl()
    this.setControlValidators()
    this.subscribeToControls()
  }

  ngOnDestroy(): void {
    this.unsubscribeCartItem.unsubscribe()
    this.unsubscribeToEdit.unsubscribe()
    this.unsubscribeToMobile.unsubscribe()
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
    if (this.editState) {
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
    if (this.editState) {
      this.distinctChange = true
    }
  }
  // SUBSCRIBTION SECTION

  // method to subscribt to ngrx store
  private subscribeToStore(): void {

    this.cartService.cart$.subscribe(
      (cart: CartModel) => {
        this.cart = cart
      }
    )

  }

  private subscribeToControls() {
    this.quantityControl.valueChanges.pipe(
      map(quantity => {
        if (this.quantityControl.errors) {
          this.quantityControl.setValue(1)
          quantity = 1
        }
      })
    ).subscribe()
  }

  private subscribeToMobile() {

    this.unsubscribeToMobile = this.isMobile$.subscribe(
      (isMobile) => {
        if (isMobile) {
          this.params = { cols: 1, height: 150, width: 150 }
        }
        else {
          this.params = { cols: 2, height: 350, width: 350 }
        }
      }
    )
  }

  private subscribtToEditMode() {
    this.unsubscribeToEdit = this.editState$.subscribe(
      (editState: boolean) => {
        this.editState = editState;
      }
    )
  }

  private subscribeToCartItem() {
    this.unsubscribeCartItem = this.cartItemService.getCartItemSubject().subscribe(
      (curentItem: CurrentItemModel) => {
        this.cartItem = CartItemModel.create(curentItem)
      })
  }


  // end of subscribe section

  // HTTP SECTION

  public handleRequest(): void {

    if (!this.editState) {
      return this.AddCartItem()
    }

    if (this.distinctChange) {
      return this.updateCartItem()
    }
  }


  // method to add item to cart
  private AddCartItem(): void {
    if (this.isLogin) {

      this.cartItemService.addCartItem(this.cartItem).subscribe(
        (cartItem: CurrentItemModel) => {
          this.handleRequestSuccess(cartItem)
        })
    } else {
      this.handleAddTmepItem()
    }
  }


  // method to update item in cart
  private updateCartItem(): void {

    if (this.isLogin) {

      this.cartItemService.updateCartItem(this.cartItem).subscribe(
        (currentItem: CurrentItemModel) => {
          this.cartItemService.emitCurrentItem(currentItem)
          this.distinctChange = false
        })
      return
    }
    const currentItem = this.cartItemService.updateTempItem(this.product, this.quantityControl.value)
    this.cartItemService.emitCurrentItem(currentItem)
    this.distinctChange = false

  }

  // main method to handle http request success
  private handleRequestSuccess(currentItem: CurrentItemModel): void {
    this.cartService.emitEditState(true);
    this.cartItemService.emitCurrentItem(currentItem)
  }

  private handleAddTmepItem(): void {
    const currentItem = this.cartItemService.addTempItem(this.product, this.quantityControl.value)
    this.cartService.emitEditState(true)
    this.cartItemService.emitCurrentItem(currentItem)
  }

  // LOGIC SECTION

  // set cart item values
  private handleCartItemData(): void {

    this.cart.getItems().length > 0
      ? this.cartItemUpdateValue()
      : this.cartItemDefaultValues();

  }

  // method to update exist cart item values
  private cartItemUpdateValue() {
    const currentItem = this.cart.findCartItem(this.product._id);
    if (currentItem) {
      this.cartItemService.emitCurrentItem(currentItem)
      this.cartService.emitEditState(true);
    } else {
      this.cartItemDefaultValues()
    }
  }

  // default values for cart item
  private cartItemDefaultValues(): void {
    const currentItem = CurrentItemModel.create(this.product, 1, this.cart.get_id())
    this.cartItemService.emitCurrentItem(currentItem)
    this.cartService.emitEditState(false);
  }

  private setDilaogProps(): void {
    this.product = this.data.payload.product;
    this.alias = this.data.payload.alias;
  }

}
