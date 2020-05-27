import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from 'src/app/utilities/models/product-model';
import { CartModel } from 'src/app/utilities/models/cart-model';
import { CartItemModel } from 'src/app/utilities/models/cart-item-model';
import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';
import { CartService } from 'src/app/utilities/services/cart.service';
import { FormControl } from '@angular/forms';
import { ReceiptService } from 'src/app/utilities/services/receipt.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  @Input() public orderMode: boolean = false

  public cartItems: CartItemModel[] = []
  public cartTotalPrice: number
  
  public searchControl = new FormControl();
  
  constructor( 
    private router: Router,
    private cartService: CartService, 
    private receiptService : ReceiptService,
    public product: ProductModel,
    public cartItem: CartItemModel,
    public cart: CartModel


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

    if (this.cartItems.length === 0) {
      alert("your cart is empty")
      return
    } 

    
    this.router.navigateByUrl(`/order/${this.cart._id}`)
  }
   
  public deleteAllCartItems() {
    const answer = confirm("Delete Cart?")
    if (!answer) {
      return 
    }
    this.cartService.deleteCartAndCartItems(this.cart._id)
  }

  public backToSore() {
    this.receiptService.resetReceiptState()
    this.router.navigateByUrl(`/products/5e91e29b9c08fc560ce2cf32`)
  }
  
  // end of logic section
}
