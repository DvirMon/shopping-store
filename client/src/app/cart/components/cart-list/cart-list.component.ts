import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';

import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { CartModel } from 'src/app/utilities/models/cart-model';

import { CartService } from 'src/app/services/cart.service';
import { ReceiptService } from 'src/app/services/receipt.service';


import { Observable } from 'rxjs';
import { cartState } from 'src/app/utilities/ngrx/state/cart-state';

import { environment } from 'src/environments/environment'
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class CartListComponent implements OnInit {

  @Input() public drawer: MatSidenav;
  @Input() public orderMode: boolean = false;

  public searchControl = new FormControl();
  public cartTotalPrice: number;

  public isMobile$ : Observable<boolean> = this.formService.isMobile()

  public cart$: Observable<typeof cartState> = this.cartService.cart$

  constructor(
    private router: Router,

    private formService : FormService,
    private cartService: CartService,
    private receiptService: ReceiptService,


    private cart: CartModel
  ) { }

  ngOnInit(): void {
    this.subscribeToCartState()
  }

  // SUBSCRIBE SECTION

  private subscribeToCartState() {
    this.cart$.subscribe(
      (state: typeof cartState) => {
        this.cart = state
      }
    )
  }


  // end of subscribe section

  // HTTP SECTION

  public deleteAllCartItems(): void {

    if (this.cart.getItems().length === 0) {
      return
    }

    const answer = confirm("Delete Cart?")

    if (!answer) {
      return
    }
    this.cartService.deleteCartAndCartItems(this.cart.get_id())
  }


  // LOGIC SECTION

  // navigate to order
  public goToOrder(): Promise<boolean> {

    if (this.cart.getItems().length === 0) {
      alert("your cart is empty")
      return
    }

    return this.router.navigateByUrl(`/home/order/${this.cart.get_id()}`)
  }

  // navigate back to store
  public backToSore(): void {
    this.receiptService.resetReceiptState()
    this.router.navigateByUrl(environment.productLandingPage)
  }

  // end of logic section
}
