import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { store } from 'src/app/redux/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public cartItems: CartItemModel[] = store.getState().cart.cartItems

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {

  }

  ngOnInit() {

    store.subscribe(
      () => this.cartItems = store.getState().cart.cartItems
    )
    const userId = this.activatedRoute.snapshot.params

    if (userId && this.cartItems.length > 0) {
      this.router.navigateByUrl("/products/5e91e29b9c08fc560ce2cf32")
    }
  }

}
