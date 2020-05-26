import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { CartItemModel } from 'src/app/utilities/models/cart-item-model';
import { ProductsService } from 'src/app/utilities/services/products.service';
import { CartService } from 'src/app/utilities/services/cart.service';
import { ReceiptService } from 'src/app/utilities/services/receipt.service';
import { ReceiptItemData } from 'src/app/utilities/models/receipt-model';
import { DialogService } from 'src/app/utilities/services/dialog.service';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.scss']
})
export class CartListItemComponent implements OnInit {

  @Input() public cartItem: CartItemModel = new CartItemModel()
  @Input() public orderMode: boolean = false
  @Input() public searchTerm: string

  public rowSpan: number;

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private dialogService: DialogService,
    private receiptService: ReceiptService,
    public product: ProductModel
  ) { }

  ngOnInit(): void {

    // style for cart item
    this.orderMode ? this.rowSpan = 2 : this.rowSpan = 1

    this.productService.getProductNameAndImage(this.cartItem.productId).subscribe(
      (response) => {
        this.product = response
        if (!this.orderMode) {

          this.receiptService.setRecipeItem(this.product, this.cartItem)
        }
      }
    )
  }

  public updateItem() {
    this.dialogService.handleProductDialog(this.product)
  }

  public deleteCartItem() {
    const answer = confirm("Delete Item ?")

    if (!answer) {
      return
    }

    this.cartService.deleteCartItem(this.cartItem._id)
  }

}
