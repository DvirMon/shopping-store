import { Component,  Input,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CartService } from 'src/app/services/cart.service';

import { CartModel } from 'src/app/utilities/models/cart.model';
import { ProductModel } from 'src/app/utilities/models/product-model';


@Component({
  selector: 'app-last-purchase',
  templateUrl: './last-purchase.component.html',
  styleUrls: ['./last-purchase.component.scss']
})
export class LastPurchaseComponent implements OnInit {

  @Input() public isMobile$ : Observable<boolean>

  constructor(
    private router : Router,
    private cartService: CartService,

    public product: ProductModel,
    public cart : CartModel
  ) { }


  ngOnInit(): void {
    this.subscribeToCart()
  }

  private subscribeToCart() {
    this.cartService.cart$.subscribe(
      (cart: CartModel) => {
        this.cart = cart
        this.product = cart.findProduct()
      }
    )
  }

  public OnClick() : Promise<boolean> {
    return this.router.navigateByUrl(`/home/order/${this.cart.get_id()}`)

  }



}
