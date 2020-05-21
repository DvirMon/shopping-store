import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './cart-list-item.component.html',
  styleUrls: ['./cart-list-item.component.scss']
})
export class CartListItemComponent implements OnInit {

  // public productCartInfo: string
  @Input() public cartItem: CartItemModel = new CartItemModel()

  public product: ProductModel = new ProductModel()
  constructor(
    private productService: ProductsService,
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.productService.getProductNameAndImage(this.cartItem.productId).subscribe(
      (response) => this.product = response
    )
  }

  public deleteCartItem() {
    const answer = confirm("Delete Item ?")

    if (!answer) {
      return
    }
    
    this.cartService.deleteCartItem(this.cartItem._id)
  }
}
