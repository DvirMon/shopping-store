import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDialog, DialogData } from 'src/app/models/dialog-model';
import { CartService } from 'src/app/services/cart.service';
import { store } from 'src/app/redux/store';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { CartModel } from 'src/app/models/cart-model';
import { ProductModel } from 'src/app/models/product-model';
import { ActionType } from 'src/app/redux/action-type';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-products-dialog',
  templateUrl: './products-dialog.component.html',
  styleUrls: ['./products-dialog.component.scss']
})
export class ProductsDialogComponent implements OnInit {


  public product: ProductModel = new ProductModel()
  public cart: CartModel = new CartModel()
  public cartItems: CartItemModel[] = []
  public cartItem: CartItemModel = new CartItemModel()

  public editMode: boolean = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private productDialogRef: MatDialogRef<ProductsDialogComponent>,
    private formService: FormService,
    private cartService: CartService,

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

    this.cartItem.totalPrice = this.handleCartItemPrice()

    if (this.cartItems.length === 0) {
      this.cartService.getNewCart(this.cartItem)
      return
    }
    this.editMode
      ? this.updateCartItem()
      : this.AddCartItem()
  }

  public AddCartItem(): void {
    this.cartService.addCartItem(this.cartItem).subscribe(
      (cartItem: CartItemModel) => {
        this.formService.handleStore(ActionType.AddCartItem, cartItem)
        this.cartItem = cartItem
        this.editMode = true
      }
    )
  }

  public updateCartItem(): void {
    console.log(this.cartItem)
    this.cartService.updateCartItem(this.cartItem).subscribe(
      (cartItem: CartItemModel) => {
        this.formService.handleStore(ActionType.UpdatedItemCart, cartItem)
      }
    )
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

  public handleCartItemPrice(): number {
    return this.cartItem.quantity * this.product.price
  }

}
