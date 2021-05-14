import { Component, OnInit, Input } from '@angular/core';

import { ProductModel } from 'src/app/utilities/models/product-model';
import { CartItemModel, CurrentItemModel } from 'src/app/utilities/models/cart-item-model';

import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { ReceiptService } from 'src/app/services/receipt.service';
import { DialogService } from 'src/app/services/dialog.service';
import { CartItemService } from 'src/app/services/cart-item.service';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './cart-list-item.component.html',
})
export class CartListItemComponent implements OnInit {

  @Input() public cartItem: CurrentItemModel
  @Input() public orderMode: boolean = false
  @Input() public searchTerm: string

  // public cartProducts: ProductModel[] = []
  public alias: string
  public rowSpan: number;
  public quantity: number

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private cartItemService: CartItemService,
    private dialogService: DialogService,
    private receiptService: ReceiptService,

  ) { }

  ngOnInit(): void {

    this.handleRowSpan();
    this.handleQuantity();
    this.getProductAlias();
    this.setReceiptItem();
  }


  // SUBSCIPTION SECTION

  private subscribeToSubject(): void {
    this.cartItemService.getCartItemSubject().subscribe(
      (cartItem: CurrentItemModel) => {
        if (cartItem._id === this.cartItem._id) {
          this.quantity = cartItem.quantity
        }
      }
    )
  }


  // HTTP SECTION
  public deleteCartItem(): void {

    const answer = confirm("Delete Item ?")

    if (!answer) {
      return
    }

    this.cartItemService.deleteCartItem(this.cartItem._id)
  }

  // end of request section


  // LOGIC SECTION

  public getProductAlias(): void {
    this.alias = this.productService.getCategoryAlias(this.cartItem.productRef)

  }

  private setReceiptItem(): void {
    if (!this.orderMode) {
      this.receiptService.setReceiptItem(this.cartItem.productRef, this.cartItem)
    }
  }

  // open product dialog
  public onUpdateClick(): void {
    this.dialogService.handleProductDialog({ product: this.cartItem.productRef, alias: this.alias })
  }


  // style for cart item
  private handleRowSpan(): void {
    this.orderMode ? this.rowSpan = 2 : this.rowSpan = 1
  }

  // update cart item quantity on dom
  private handleQuantity(): void {
    this.quantity = this.cartItem.quantity
    this.subscribeToSubject()
  }




}
