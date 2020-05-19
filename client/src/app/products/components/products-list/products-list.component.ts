import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product-model';
import { CartModel } from 'src/app/models/cart-model';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';

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
  public cartTotalPrice : number 


  constructor(
    private router : Router
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

  private getCartTotalPrice() {

  }
}
