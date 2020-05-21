import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { CartModel } from 'src/app/models/cart-model';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {


  public product: ProductModel = new ProductModel()
  public cart: CartModel = new CartModel()
  public cartItems: CartItemModel[] = []
  public cartItem: CartItemModel = new CartItemModel()
  public cartTotalPrice: number


  constructor(
    private router: Router,
    private cartService : CartService

  ) { }

  ngOnInit(): void {

    this.handleStoreSubscribe()
  }

  // subscribe section

  private handleStoreSubscribe(): void {
    store.subscribe(
      () => {
        this.cartItems = store.getState().cart.cartItems;
        this.cart = store.getState().cart.cart;
        this.cartTotalPrice = store.getState().cart.cartTotalPrice;
      }
    )
    this.cartItems = store.getState().cart.cartItems;
    this.cart = store.getState().cart.cart;
    this.cartTotalPrice = store.getState().cart.cartTotalPrice;
  }

  // end of subscribe section

  // logic section

  public goToOrder() {
    this.router.navigateByUrl(`/order/${this.cart._id}`)
  }

  public deleteAllCartItems() {
    const answer = confirm("Delete Cart?")
    if (!answer) {
      return
    }
    this.cartService.deleteCartAndCartItems(this.cart._id)
  }

  public handleCartItemList() {
    
  }

}
