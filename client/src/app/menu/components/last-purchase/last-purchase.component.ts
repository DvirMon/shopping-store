import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartModel } from 'src/app/utilities/models/cart-model';
import { ProductModel } from 'src/app/utilities/models/product-model';

@Component({
  selector: 'app-last-purchase',
  templateUrl: './last-purchase.component.html',
  styleUrls: ['./last-purchase.component.scss']
})
export class LastPurchaseComponent implements OnInit {


  public images: string[] = [
    "gluten", "organic", "lactose"
  ]

  constructor(
    private cartService: CartService,
    public product: ProductModel
  ) { }


  ngOnInit(): void {
    this.subscribeToCart()
  }



  private subscribeToCart() {
    this.cartService.cart$.subscribe(
      (cart: CartModel) => {
        this.product = cart.findProduct()
      }
    )
  }

}
