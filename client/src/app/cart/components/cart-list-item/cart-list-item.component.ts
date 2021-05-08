import { Component, OnInit, Input } from '@angular/core';

import { ProductModel } from 'src/app/utilities/models/product-model';
import { CartItemModel, CurrentItemModel } from 'src/app/utilities/models/cart-item-model';

import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { ReceiptService } from 'src/app/services/receipt.service';
import { DialogService } from 'src/app/services/dialog.service';

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
    private dialogService: DialogService,
    private receiptService: ReceiptService,
    // public product: ProductModel,

  ) { }

  ngOnInit(): void {

    this.handleRowSpan();
    this.subscribeToStore();
    this.handleQuantity();
    this.getProductAlias();
    this.setReceiptItem();
  }


  // subscription section

  private subscribeToStore(): void {
    // store.subscribe(
    //   () => {
    //     this.cartProducts = store.getState().cart.cartProducts;
    //   }
    // )
    // this.cartProducts = store.getState().cart.cartProducts;
  }

  private subscribeToSubject(): void {
    this.cartService.getCartItemSubject().subscribe(
      (cartItem: CurrentItemModel) => {
        if (cartItem._id === this.cartItem._id) {
          this.quantity = cartItem.quantity
        }
      }
    )
  }


  // request section
  public deleteCartItem(): void {

    const answer = confirm("Delete Item ?")

    if (!answer) {
      return
    }

    this.cartService.deleteCartItem(this.cartItem._id)
  }

  // end of request section


  // logic section

  // public getProductFromStore(): void {
  //   this.product = this.cartProducts.find(product => product._id === this.cartItem.product)
  // }

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
  private handleQuantity() : void{
    this.quantity = this.cartItem.quantity
    this.subscribeToSubject()
  }




}
