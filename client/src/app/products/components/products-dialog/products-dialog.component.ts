
import { Component, OnInit, Inject, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

import { FormControl, NgModel, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';

import { CartItemModel, CurrentItemModel } from 'src/app/utilities/models/cart-item-model';
import { CartModel } from 'src/app/utilities/models/cart-model';
import { ProductModel } from 'src/app/utilities/models/product-model';

import { FormService } from 'src/app/services/form.service';
import { CartService } from 'src/app/services/cart.service';
import { DialogData } from 'src/app/services/dialog.service';

import { map } from 'rxjs/operators';

import { ActionType } from 'src/app/utilities/redux/action-type';
import { store } from 'src/app/utilities/redux/store';
import { Observable, Subscription } from 'rxjs';
import { CartItemService } from 'src/app/services/cart-item.service';

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

  private distinctChange: boolean = false
  private editMode: boolean = false

  private unsubscribeCartItem: Subscription
  private unsubscribeToEdit: Subscription
  private unsubscribeToMobile: Subscription

  public isMobile: Observable<boolean> = this.formService.isMobile$
  public quantityControl: FormControl
  public editState$: Observable<boolean> = this.cartService.getEditState()
  public minQuantity: boolean = false
  public alias: string
  public params: imageParams





  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,

    private formService: FormService,
    private cartService: CartService,
    private cartItemService : CartItemService,

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

    this.unsubscribeToMobile = this.isMobile.subscribe(
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
      (editMode: boolean) => {
        this.editMode = editMode;
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


    if (this.cart.getItems().length === 0) {
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
      (cartItem: CurrentItemModel) => {
        this.handleRequestSuccess(cartItem)
      }
    )
  }

  private AddCartItem(): void {
    this.cartItemService.addCartItem(this.cartItem).subscribe(
      (cartItem: CurrentItemModel) => {
        this.handleRequestSuccess(cartItem)
      }
    )
  }

  private updateCartItem(): void {
    this.cartItemService.updateCartItem(this.cartItem).subscribe(
      (cartItem: CurrentItemModel) => {
        this.handleRequestSuccess(cartItem)
        this.distinctChange = false
      }
    )
  }

  // TODO - calculate cart total price

  // main method to handle cart item actions
  private handleRequestSuccess(cartItem: CurrentItemModel): void {

    if (this.editMode) {
    } else {
      this.cartService.emitEditState(true);
    }
    this.cartItemService.emitCartItem(cartItem)

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
    const currentItem = this.cart.findCartItem(this.product._id);
    if (currentItem) {
      this.cartItemService.emitCartItem(currentItem)
      this.cartService.emitEditState(true);
    } else {
      this.cartItemDefaultValues()
    }
  }

  // default values for cart item
  private cartItemDefaultValues(): void {
    const currentItem = CurrentItemModel.create(this.product, this.cart.get_id())
    this.cartItemService.emitCartItem(currentItem)
    this.cartService.emitEditState(false);
  }
 
  private setDilaogProps(): void {
    this.product = this.data.payload.product;
    this.alias = this.data.payload.alias;
  }

}
