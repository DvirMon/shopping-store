import { Component, OnInit, Input } from '@angular/core';

import { CurrentItemModel } from 'src/app/utilities/models/cart-item-model';

import { ProductsService } from 'src/app/services/products.service';
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

  public alias: string
  public quantity: number

  constructor(
    private productService: ProductsService,
    private cartItemService: CartItemService,
    private dialogService: DialogService,
    private receiptService: ReceiptService,

  ) { }

  ngOnInit(): void {
    this.getProductAlias();
    this.setReceiptItem();
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
    this.dialogService.handleProductDialog(this.cartItem.productRef)
  }

}
